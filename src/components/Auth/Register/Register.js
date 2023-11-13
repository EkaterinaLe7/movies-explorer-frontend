import React, { useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
// import { useForm } from "../../../hooks/useForm";
import { useFormWithValidation } from "../../../hooks/useForm";
import AuthForm from "../AuthForm/AuthForm";

function Register({ isLoading, onRegister }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const { name, email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    onRegister({
      name: name,
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
          isValid={isValid}
        >
          <label className="register__label">
            Имя
            <input
              className={`register__input ${
                errors.name ? "register__input_type_error" : ""
              }`}
              type="text"
              id="name-input"
              name="name"
              value={values.name || ""}
              placeholder="Имя"
              required
              minLength={2}
              maxLength={30}
              pattern="[\-a-zA-zа-яёА-ЯЁ ]{2,30}"
              onChange={handleChange}
            />
            <span className="register__error name-input-error">
              {errors.name}
            </span>
          </label>
          <label className="register__label">
            E-mail
            <input
              className={`register__input ${
                errors.email ? "register__input_type_error" : ""
              }`}
              type="email"
              id="email-input"
              name="email"
              value={values.email || ""}
              placeholder="Email"
              required
              minLength={2}
              maxLength={40}
              onChange={handleChange}
            />
            <span className="register__error email-input-error">
              {errors.email}
            </span>
          </label>
          <label className="register__label">
            Пароль
            <input
              className={`register__input ${
                errors.password ? "register__input_type_error" : ""
              }`}
              type="password"
              id="password-input"
              name="password"
              value={values.password || ""}
              placeholder="Пароль"
              required
              onChange={handleChange}
            />
            <span className="register__error password-input-error">
              {errors.password}
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
