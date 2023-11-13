import React, { useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import { useFormWithValidation } from "../../../hooks/useForm";

function Login({ isLoading, onLogin }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const { email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    onLogin(email, password);
  };

  return (
    <main className="login">
      <div className="login__container">
        <AuthForm
          isLoading={isLoading}
          title="Рады видеть!"
          buttonText="Войти"
          handleSubmit={handleSubmit}
          isValid={isValid}
        >
          <div className="login__wrapper">
            <label className="login__label">
              E-mail
              <input
                className={`login__input ${
                  errors.email ? "login__input_type_error" : ""
                }`}
                type="email"
                id="email-login"
                name="email"
                value={values.email || ""}
                placeholder="Email"
                required
                onChange={handleChange}
              />
              <span className="login__error email-input-error">
                {errors.email}
              </span>
            </label>
            <label className="login__label">
              Пароль
              <input
                className={`login__input ${
                  errors.password ? "login__input_type_error" : ""
                }`}
                type="password"
                id="password-login"
                name="password"
                value={values.password || ""}
                placeholder="Пароль"
                required
                onChange={handleChange}
              />
              <span className="login__error password-input-error">
                {errors.password}
              </span>
            </label>
          </div>
        </AuthForm>
        <p className="login__link-text">
          Ещё не зарегистрированы?{" "}
          <Link className="login__link" to="/signup">
            Регистрация
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
