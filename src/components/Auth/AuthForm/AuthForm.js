import React from "react";
import "./AuthForm.css";
import Logo from "../../Logo/Logo";

function AuthForm({ isLoading, title, children, buttonText }) {
  return (
    <div className="auth">
      <div className="auth__container">
        <Logo />
        <h2 className="auth__title">{title}</h2>
      </div>
      <form className="auth__form" method="post" name="register">
        {children}
        <button className="auth__button" type="submit">
          {`${isLoading ? "Отправка..." : buttonText}`}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
