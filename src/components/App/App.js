import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import Preloader from "../Preloader/Preloader";
import okSign from "../../images/OkSign.svg";
import notOkSign from "../../images/notOkSign.svg";
import {handleErrorsUser} from "../../utils/utils"
import * as api from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [infoTooltipSign, setInfoTooltipSign] = useState("");
  const [infoTooltipText, setInfoTooltipText] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isAppIsReady, setIsAppIsReady] = useState(false);

  const navigate = useNavigate();

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getUserInfo(jwt)
        .then((res) => {
          if (res) {
            // авторизуем пользователя
            setLoggedIn(true);
            setIsAppIsReady(true);
            // navigate("/movies", { replace: true });
          
          }
        })
        .catch((err) => {console.log(err)})
        // .finally(() => {
        //   setIsAppIsReady(false);
        // });
    }
  };

  useEffect(() => {
    checkToken()
    // if (checkToken()) {
    //   setIsAppIsReady(true)
    // } else {
    //   setIsAppIsReady(false)
    // }
    
    
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
        
        .then((userData) => {
          setCurrentUser(userData)
        })
        .catch(console.error)
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
        // setInfoTooltipText("Что-то пошло не так! Попробуйте еще раз.");
        // setInfoTooltipText(err);
        handleErrorsUser(err, setInfoTooltipText);
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
        // setInfoTooltipText("Неверный логин или пароль");
        handleErrorsUser(err, setInfoTooltipText);
        setIsInfoTooltipPopupOpen(true);
      });
  };

  const handleUpdateUser = (data) => {
    setIsLoadingProfile(true);
    return (
      api
        .setUserInfo(data)
        .then((data) => {
          setInfoTooltipSign(okSign);
          setInfoTooltipText("Данные обновлены");
          setCurrentUser(data);
          handleEditOff();
        })
        // .then(setCurrentUser)
        // .catch(console.error)
        .catch((err) => {
          console.log(err);
          setInfoTooltipSign(notOkSign);
          // setInfoTooltipText(err);
          handleErrorsUser(err, setInfoTooltipText);
          setIsInfoTooltipPopupOpen(true);
        })
        .finally(() => {
          setIsLoadingProfile(false);
          setIsInfoTooltipPopupOpen(true);
        })
    );
  };


  const renderPreloader = () => {
    return (
<Preloader />
    )
  }



  function handleEditOn() {
    setIsEdit(true);
  }

  function handleEditOff() {
    setIsEdit(false);
  }

  const signOut = () => {
    if (!localStorage.getItem("jwt")) return;
    localStorage.removeItem("jwt");
    localStorage.removeItem("searchedMovies");
    localStorage.removeItem("searchTextQuery");
    localStorage.removeItem("filterCheck");
    localStorage.removeItem("allMovies");
    setLoggedIn(false);
    // localStorage.clear();

    navigate("/", { replace: true });
  };

  return (
 
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      {/* {!isAppIsReady ? renderPreloader() : <> */}
        <Routes>
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
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                isLoading={isLoadingProfile}
                onUpdateUser={handleUpdateUser}
                onSignOut={signOut}
                isEdit={isEdit}
                handleEditOn={handleEditOn}
                handleEditOff={handleEditOff}
              />
            }
          />
          
          <Route path="/" element={<Main loggedIn={loggedIn} /> } />
          <Route
            path="/signup"
            element={<>
              {!loggedIn ? <Register isLoading={isLoadingSubmit} onRegister={onRegister} /> : <Navigate to="/" replace />}
              </>} 
            // element={
            //   <Register isLoading={isLoadingSubmit} onRegister={onRegister} />
            // }
          />
          <Route
            path="/signin"
                        element={<>
              {!loggedIn ? <Login isLoading={isLoadingSubmit} onLogin={onLogin} /> : <Navigate to="/" replace />}
              </>}
            // element={<Login isLoading={isLoadingSubmit} onLogin={onLogin} />}
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      {/* </>} */}
      
          
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
