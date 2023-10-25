import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  const [currentUser] = useState({
    name: "Виталий",
    email: "pochta@yandex.ru",
  });

  return (
    <main className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form">
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              type="text"
              id="name-input"
              name="name"
            //   временное решение для верстки
              defaultValue={currentUser.name}
              placeholder="Имя"
              required=""
              minLength={2}
              maxLength={40}
            />
          </label>
          <div className="profile__border"></div>
          <label className="profile__label">
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
            />
          </label>
        <button className="profile__btn" type="submit">
          Редактировать
        </button>
      </form>
      <button className="profile__btn profile__btn_type_logout">Выйти из аккаунта</button>
    </main>
  );
}

export default Profile;
