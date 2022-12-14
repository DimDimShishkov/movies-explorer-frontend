import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import "./Profile.css";

export default function Profile({
  handleSubmitForm,
  isLoading,
  errorType,
  handleLoggedOut,
  isUserChanged,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [buttonText, setButtonText] = useState("Сохранить");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [validationMessage, setValidationMessage] = useState({});
  const [newValue, setNewValue] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  let nameReg = /^[a-za-яё -]+$/i;
  let emailReg = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/;
  const submitButtonState = !validationMessage.name && !validationMessage.email;

  useEffect(() => {
    setNewValue({
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name,
    });
  }, [currentUser]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSubmitForm({
      id: currentUser.id,
      email: newValue.email,
      name: newValue.name,
    });
  };

  useEffect(() => {
    if (isLoading) {
      return setButtonText("Загрузка...");
    } else {
      if (isUserChanged) {
        setIsDirty(false);
        setIsFormSubmit(true);
      }
      return setButtonText("Сохранить");
    }
  }, [isUserChanged, isLoading]);

  const handleChange = (evt) => {
    setIsDirty(true);
    setIsFormSubmit(false);
    const name = evt.target.name;
    const value = evt.target.value;
    setNewValue({ ...newValue, [name]: value });
    if (name === "name" && !nameReg.test(value)) {
      return setValidationMessage({
        ...validationMessage,
        [name]:
          "Имя должно состоять из латиницы, кириллицы, пробелов или дефисов.",
      });
    }
    if (name === "email" && !emailReg.test(value)) {
      return setValidationMessage({
        ...validationMessage,
        [name]: "Неправильный формат почты.",
      });
    }
    if (value === currentUser[name]) {
      return setValidationMessage({
        ...validationMessage,
        [name]: "Изменения соответсвуют существующим данным.",
      });
    }
    setValidationMessage({
      ...validationMessage,
      [name]: evt.target.validationMessage,
    });
  };

  let submitButtonContent;
  if (isDirty) {
    submitButtonContent = (
      <div className="profile__submit-container">
        {errorMessage && (
          <span className="profile__submit-error">{errorMessage}</span>
        )}
        <button
          type="submit"
          className={`profile__submit-button ${
            (!submitButtonState || isLoading || isFormSubmit) &&
            "profile__submit-button_disabled"
          } `}
          disabled={!submitButtonState || isLoading || isFormSubmit}
        >
          {buttonText}
        </button>
      </div>
    );
  } else {
    submitButtonContent = (
      <div className="profile__submit-container">
        <span className="profile__span">
          {isUserChanged ? "Данные отправлены" : "Редактировать"}
        </span>
        <span onClick={() => handleLoggedOut()} className="profile__link">
          Выйти из аккаунта
        </span>
      </div>
    );
  }

  // ошибки после отправки запроса на сервер
  useEffect(() => {
    if (errorType === 409) {
      setErrorMessage("Пользователь с таким email уже существует");
    } else if (errorType === 401) {
      setErrorMessage("Неправильные почта или имя");
    } else if (errorType) {
      setErrorMessage("На сервере произошла ошибка");
    } else {
      setErrorMessage("");
    }
  }, [errorType]);

  return (
    <>
      <Header isLoggedIn={true} />
      <main className="main">
        <section className="profile">
          <div className="profile__section">
            <h2 className="profile__heading">Привет, {currentUser.name}!</h2>
            <form
              autoComplete="off"
              className="profile__form"
              onSubmit={handleSubmit}
            >
              <fieldset className="profile__fieldset">
                <label className="profile__label">
                  <p className="profile__title">Имя</p>

                  <input
                    className="profile__input"
                    required
                    type="text"
                    placeholder="Введите новое имя"
                    name="name"
                    value={newValue.name ?? currentUser.name}
                    minLength="2"
                    maxLength="30"
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {validationMessage?.name && (
                    <span className="profile__input-error">
                      {validationMessage?.name}
                    </span>
                  )}
                </label>

                <span className="profile__line" />

                <label className="profile__label">
                  <p className="profile__title">E-mail</p>
                  <input
                    required
                    type="email"
                    name="email"
                    value={newValue.email ?? currentUser.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {validationMessage?.email && (
                    <span className="profile__input-error">
                      {validationMessage?.email}
                    </span>
                  )}
                </label>
              </fieldset>
              {submitButtonContent}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
