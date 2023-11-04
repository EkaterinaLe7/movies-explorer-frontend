import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Auth/Profile/Profile";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import okSign from "../../images/OkSign.svg";
import notOkSign from "../../images/notOkSign.svg";
import * as api from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [infoTooltipSign, setInfoTooltipSign] = useState("");
  const [infoTooltipText, setInfoTooltipText] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (localStorage.getItem("jwt")) {
      api
        .getUserInfo(jwt)
        .then((res) => {
          if (res) {
            // авторизуем пользователя
            setLoggedIn(true);
            navigate("/movies", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (loggedIn) {
      api
        .getUserInfo(jwt)
        // .getAppInfo()
        // .then(([cardsArray, userData]) => {
        //   setCards(cardsArray.reverse());
        //   setCurrentUser(userData);
        // })
        .then(setCurrentUser)
        .catch(console.error);
    }
  }, [loggedIn]);

  function closePopup() {
    setIsInfoTooltipPopupOpen(false);
  }

  const onRegister = (data) => {
    setIsLoadingSubmit(true);
    return api
      .register(data)
      .then(() => {
        setInfoTooltipSign(okSign);
        setInfoTooltipText("Вы успешно зарегистрировались!");
        // navigate("/signin");
        onLogin(data.email, data.password);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipSign(notOkSign);
        setInfoTooltipText("Что-то пошло не так! Попробуйте еще раз.");
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
        setIsLoadingSubmit(false);
      });
  };

  const onLogin = (email, password) => {
    return api
      .authorize(email, password)
      .then((data) => {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipSign(notOkSign);
        setInfoTooltipText("Неверный логин или пароль");
        setIsInfoTooltipPopupOpen(true);
      });
  };
  


  const signOut = () => {
    if (!localStorage.getItem("jwt")) return;
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    // localStorage.clear();

    navigate("/", { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={<ProtectedRoute element={Movies} loggedIn={loggedIn} />}
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />
            }
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={Profile} loggedIn={loggedIn} onSignOut={signOut} />}
          />
          <Route
            path="/signup"
            element={
              <Register isLoading={isLoadingSubmit} onRegister={onRegister} />
            }
          />
          <Route
            path="/signin"
            element={<Login isLoading={isLoadingSubmit} onLogin={onLogin} />}
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <InfoTooltip
          sign={infoTooltipSign}
          text={infoTooltipText}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
