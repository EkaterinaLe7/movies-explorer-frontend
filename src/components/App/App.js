import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
// import notOkSign from "../../images/notOkSign.svg";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route
          path="/movies"
          element={<ProtectedRoute element={Movies} loggedIn={loggedIn} />}
        />
        <Route
          path="/saved-movies"
          element={<ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={Profile} loggedIn={loggedIn} />}
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <InfoTooltip sign={okSign} text={"Вы успешно зарегистрировались!"} />
    </div>
  );
}

export default App;
