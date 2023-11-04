import React, { useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import { useForm } from "../../../hooks/useForm";

function Login({ isLoading, onLogin }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    setValues({
      email: "",
      password: "",
    });
  }, [setValues]);

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
        <AuthForm isLoading={isLoading} title="Рады видеть!" buttonText="Войти" handleSubmit={handleSubmit}>
          <div className="login__wrapper">
            <label className="login__label">
              E-mail
              <input
                className="login__input login__input_content_email"
                type="email"
                id="email-login"
                name="email"
                value={values.email || ""}
                placeholder="Email"
                required=""
                minLength={2}
                maxLength={40}
                onChange={handleChange}
              />
              <span className="login__error email-input-error"></span>
            </label>
            <label className="login__label">
              Пароль
              <input
                className="login__input login__input_content_password"
                type="password"
                id="password-login"
                name="password"
                value={values.password || ""}
                placeholder="Пароль"
                required=""
                minLength={5}
                maxLength={40}
                onChange={handleChange}
              />
              <span className="login__error password-input-error">
                Что-то пошло не так...
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
