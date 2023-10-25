import React from "react";
import "./AuthForm.css";
import { Link } from "react-router-dom";

function AuthForm({isLoading, title, children, buttonText}) {
return(
    <>
        <Link to="/" className="auth__logo" />
        <h2 className="auth__title">{title}</h2>
        <form className="auth__form" method="post" name="register">
        {children}
          <button className="auth__button" type="submit">
            {`${isLoading ? "Отправка..." : buttonText}`}
          </button>
        </form>
      </>
)
}

export default AuthForm;