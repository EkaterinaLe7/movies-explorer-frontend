import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css"
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"

function App() {
  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header isMainPage={true}/>
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header/>
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header/>
              <SavedMovies />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
