import React from "react";
import "./AuthForm.css";
import Logo from "../../Logo/Logo";

function AuthForm({ isLoading, title, name, children, buttonText, handleSubmit, isValid }) {
  return (
    <div className="auth">
      <div className="auth__container">
        <Logo />
        <h2 className="auth__title">{title}</h2>
      </div>
      <form className="auth__form" method="post" name={name} onSubmit={handleSubmit} noValidate>
        <div className="auth__wrapper">{children}</div>
        <span className="profile__error">
              </span>
        <button className={`auth__button ${!isValid ? "auth__button_disabled" : ""}`} type="submit">
          {`${isLoading ? "Отправка..." : buttonText}`}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
