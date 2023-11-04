import React, { useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import AuthForm from "../AuthForm/AuthForm";

function Register({ isLoading, onRegister }) {
  const { values, handleChange, setValues } = useForm({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setValues({
      username: "",
      email: "",
      password: "",
    });
  }, [setValues]);

  const { username, email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return;
    }

    onRegister({
      name: username,
      email: email,
      password: password,
    });
  };

  return (
    <main className="register">
      <div className="register__container">
        <AuthForm
          isLoading={isLoading}
          title="Добро пожаловать!"
          name="register"
          buttonText="Зарегистрироваться"
          handleSubmit={handleSubmit}
        >
          <label className="register__label">
            Имя
            <input
              className="register__input register__input_content_name"
              type="text"
              id="name-input"
              name="username"
              value={values.username || ""}
              placeholder="Имя"
              required=""
              minLength={2}
              maxLength={40}
              onChange={handleChange}
            />
            <span className="register__error name-input-error"></span>
          </label>
          <label className="register__label">
            E-mail
            <input
              className="register__input register__input_content_email"
              type="email"
              id="email-input"
              name="email"
              value={values.email || ""}
              placeholder="Email"
              required=""
              minLength={2}
              maxLength={40}
              onChange={handleChange}
            />
            <span className="register__error email-input-error"></span>
          </label>
          <label className="register__label">
            Пароль
            <input
              className="register__input register__input_content_password register__input_type_error"
              type="password"
              id="password-input"
              name="password"
              value={values.password || ""}
              placeholder="Пароль"
              required=""
              minLength={5}
              maxLength={40}
              onChange={handleChange}
            />
            <span className="register__error password-input-error">
            </span>
          </label>
        </AuthForm>
        <p className="register__link-text">
          Уже зарегистрированы?{" "}
          <Link className="register__link" to="/signin">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
