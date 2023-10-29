import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  const [currentUser] = useState({
    name: "Виталий",
    email: "pochta@yandex.ru",
  });

  const [isFocusedInputName, setIsFocusedInputName] = useState(false);
  const [isFocusedInputEmail, setIsFocusedInputEmail] = useState(false);
  // const [isEditMode, setIsEditMode] = useState(false);

  function handleFocusName() {
    setIsFocusedInputName(true);
  }
  function handleFocusEmail() {
    setIsFocusedInputEmail(true);
  }

  function handleBlurName() {
    setIsFocusedInputName(false);
  }

  function handleBlurEmail() {
    setIsFocusedInputEmail(false);
  }

  // function handleEditMode {
  //   setIsEditMode(true);
  // }

  return (
    <main className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form">
        <div>
          <label
            className={`profile__label ${
              isFocusedInputName ? "profile__label_focused" : ""
            } `}
          >
            Имя
            <input
              className="profile__input"
              type="text"
              id="name-input"
              name="name"
              defaultValue={currentUser.name}
              placeholder="Имя"
              required
              minLength={2}
              maxLength={40}
              onFocus={handleFocusName}
              onBlur={handleBlurName}
            />
          </label>
          <div className="profile__border"></div>
          <label
            className={`profile__label ${
              isFocusedInputEmail ? "profile__label_focused" : ""
            } `}
          >
            E-mail
            <input
              className="profile__input"
              type="email"
              id="email-input"
              name="email"
              //   временное решение для верстки
              defaultValue={currentUser.email}
              placeholder="E-mail"
              required=""
              minLength={2}
              maxLength={40}
              onFocus={handleFocusEmail}
              onBlur={handleBlurEmail}
            />
          </label>
        </div>
        
        <button className="profile__btn" type="submit">
          Редактировать
        </button>
      </form>
      <button className="profile__btn profile__btn_type_logout">
        Выйти из аккаунта
      </button>
    </main>
  );
}

export default Profile;
