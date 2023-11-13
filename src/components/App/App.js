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
import * as api from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import {
  REGISTER_SUCCESS_TEXT,
  UPDATE_PROFILE_SUCCESS_TEXT,
  NOT_READY_STATE_TIME,
  INFO_POPUP_CLOSE_TIME,
} from "../../utils/constants";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [infoTooltipSign, setInfoTooltipSign] = useState("");
  const [infoTooltipText, setInfoTooltipText] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isAppIsNotReady, setIsAppIsNotReady] = useState(true);
  const [savedCards, setSavedCards] = useState([]);

  const navigate = useNavigate();

  const checkToken = () => {
    setIsAppIsNotReady(true);
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .then(() => setIsAppIsNotReady(false))
        .catch((err) => {
          console.log(err);
        });
    }
    setTimeout(() => {
      setIsAppIsNotReady(false);
    }, NOT_READY_STATE_TIME);
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()

        .then(setCurrentUser)
        .catch(console.error);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getCards()

        .then((cards) => {
          setSavedCards(cards.reverse());
        })
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
        setInfoTooltipText(REGISTER_SUCCESS_TEXT);
        onLogin(data.email, data.password);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipSign(notOkSign);
        setInfoTooltipText(err);
        setIsInfoTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
        setIsLoadingSubmit(false);
        setTimeout(() => {
          closePopup();
        }, INFO_POPUP_CLOSE_TIME);
      });
  };

  const onLogin = (email, password) => {
    setIsLoadingSubmit(true);
    return api
      .authorize(email, password)
      .then((data) => {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipSign(notOkSign);
        setInfoTooltipText(err);
        setIsInfoTooltipPopupOpen(true);
        setTimeout(() => {
          closePopup();
        }, INFO_POPUP_CLOSE_TIME);
      })
      .finally(() => {
        setIsLoadingSubmit(false);
      });
  };

  const handleUpdateUser = (data) => {
    setIsLoadingProfile(true);
    return api
      .setUserInfo(data)
      .then((data) => {
        setInfoTooltipSign(okSign);
        setInfoTooltipText(UPDATE_PROFILE_SUCCESS_TEXT);
        setCurrentUser(data);
        handleEditOff();
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipSign(notOkSign);
        setInfoTooltipText(err);
        setIsInfoTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsLoadingProfile(false);
        setIsInfoTooltipPopupOpen(true);
        setTimeout(() => {
          closePopup();
        }, INFO_POPUP_CLOSE_TIME);
      });
  };

  function handleCreateMovieCard(data) {
    return api
      .createCard(data)
      .then((newCard) => {
        setSavedCards([newCard, ...savedCards]);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipSign(notOkSign);
        setInfoTooltipText(err);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleCardDelete(card) {
    return api
      .deleteCard(card._id)
      .then(() => {
        setSavedCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipSign(notOkSign);
        setInfoTooltipText(err);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleEditOn() {
    setIsEdit(true);
  }

  function handleEditOff() {
    setIsEdit(false);
  }

  const signOut = () => {
    localStorage.clear();
    setLoggedIn(false);

    navigate("/", { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/movies"
            element={
              <>
                {isAppIsNotReady ? (
                  <Preloader />
                ) : (
                  <ProtectedRoute
                    element={Movies}
                    loggedIn={loggedIn}
                    onSaveCard={handleCreateMovieCard}
                    savedCards={savedCards}
                    handleCardDelete={handleCardDelete}
                  />
                )}
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                {isAppIsNotReady ? (
                  <Preloader />
                ) : (
                  <ProtectedRoute
                    element={SavedMovies}
                    loggedIn={loggedIn}
                    savedCards={savedCards}
                    handleCardDelete={handleCardDelete}
                  />
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                {isAppIsNotReady ? (
                  <Preloader />
                ) : (
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
                )}
              </>
            }
          />

          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/signup"
            element={
              <>
                {!loggedIn ? (
                  <Register
                    isLoading={isLoadingSubmit}
                    onRegister={onRegister}
                  />
                ) : (
                  <Navigate to="/" replace />
                )}
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                {!loggedIn ? (
                  <Login isLoading={isLoadingSubmit} onLogin={onLogin} />
                ) : (
                  <Navigate to="/" replace />
                )}
              </>
            }
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
