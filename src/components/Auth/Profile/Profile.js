import React, { useEffect, useContext, useState } from "react";
import "./Profile.css";
import Header from "../../Header/Header";
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import { useFormWithValidation } from "../../../hooks/useForm";

function Profile({ loggedIn, isLoading, onUpdateUser, onSignOut, isEdit, handleEditOn, handleEditOff }) {
  const currentUser = useContext(CurrentUserContext);
  // const [isCurrentValues, setIsCurrentValues] = useState(false);

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  // useEffect(() => {
  //   if (currentUser) {
  //     resetForm(currentUser);
  //   }
  // }, [currentUser, resetForm]);

  // const { values, handleChange, setValues } = useForm({
  //   username: "",
  //   useremail: "",
  // });

  // useEffect(() => {
  //   setValues({
  //     username: currentUser.name,
  //     useremail: currentUser.email,
  //   });
  // }, [currentUser, setValues]);

    useEffect(() => {
      handleEditOff();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      email: values.email,
    });
  }

  // const [currentUser] = useState({
  //   name: "Виталий",
  //   email: "pochta@yandex.ru",
  // });

  // useEffect(() => {
  //   if (currentUser.name === values.name && currentUser.email === values.email) {
  //     setIsCurrentValues(true);
  //   } else {
  //     setIsCurrentValues(false);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [values]);

  const validityCheck =(!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  const [isFocusedInputName, setIsFocusedInputName] = useState(false);
  const [isFocusedInputEmail, setIsFocusedInputEmail] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);

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

  // function handleEdit() {
  //   setIsEdit(!isEdit);
  // }

  return (
    <>
    <Header loggedIn={loggedIn} />
    <main className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleSubmit} noValidate>
        <div>
          <label
            className={`profile__label ${
              isFocusedInputName ? "profile__label_focused" : ""
            } ${errors.name ? "profile__label_type_error" : ""}`}
          >
            Имя
            <input
              className="profile__input"
              type="text"
              id="name-input"
              name="name"
              disabled={isEdit ? false : true}
              value={values.name || ""}
              placeholder="Имя"
              required
              minLength={2}
              maxLength={30}
              pattern='[\-a-zA-zа-яёА-ЯЁ ]{2,30}'
              onFocus={handleFocusName}
              onBlur={handleBlurName}
              onChange={handleChange}
            />
          </label>
          <span className="profile__input-error">{errors.name}</span>
          <div className="profile__border"></div>
          <label
            className={`profile__label ${
              isFocusedInputEmail ? "profile__label_focused" : ""
            } ${errors.email ? "profile__label_type_error" : ""}`}
          >
            E-mail
            <input
              className="profile__input"
              type="email"
              id="email-input"
              name="email"
              disabled={isEdit ? false : true}
              value={values.email || ""}
              placeholder="E-mail"
              required
              minLength={2}
              maxLength={40}
              onFocus={handleFocusEmail}
              onBlur={handleBlurEmail}
              onChange={handleChange}
            />
            
          </label>
          <span className="profile__input-error">{errors.email}</span>
        </div>

        <div className="profile__btn-container">
          {isEdit ? (
            <>
              <span className="profile__error">
                
              </span>
              <button className={`profile__btn-submit ${validityCheck ? "popup__btn-submit_disabled" : ""}`} type="submit" disabled={validityCheck ? true : false} >
                {`${isLoading ? "Сохранение..." : "Сохранить"}`}
              </button>
            </>
          ) : (
            <>
              <button
                className="profile__btn"
                type="button"
                onClick={handleEditOn}
              >
                Редактировать
              </button>
              <button className="profile__btn profile__btn_type_logout" onClick={onSignOut}>
                Выйти из аккаунта
              </button>
            </>
          )}
        </div>
      </form>
    </main>
    </>
  );
}

export default Profile;
