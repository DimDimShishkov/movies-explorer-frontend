import React, { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import "./Profile.css";

export default function Profile() {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("Редактировать");
  const [isLoading, setIsLoading] = useState(false);

  // валидация формы
  const [errorsName, setErrorsName] = useState({
    name: false,
    email: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
  });

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isLoading) {
      setButtonText("Загрузка...");
    } else {
      setButtonText("Редактировать");
    }
    /*     onUpdateUser({
      name,
      about: description,
    }); */
  }

  return (
    <>
      <Header isLoggedIn={true} />
      <section className="profile">
        <div className="profile__section">
          <h2 className="profile__heading">Привет, {currentUser.name}!</h2>
          <form
            autoComplete="new-email"
            className="profile__form"
            noValidate
            onSubmit={handleSubmit}
          >
            <fieldset className="profile__fieldset">
              <label className="profile__label">
                <p className="profile__title">Имя</p>
                <input
                  required={true}
                  type="name"
                  className="profile__input"
                  id="name"
                  placeholder="Введите новое имя"
                  value={name || ""}
                  onChange={handleNameChange}
                />
                <span className="profile__input-error profile__input-error_type_name"></span>
              </label>
              <span className="profile__line" />
              <label className="profile__label">
                <p className="profile__title">E-mail</p>
                <input
                  required={true}
                  type="email"
                  className="profile__input"
                  id="email"
                  placeholder="Введите пароль"
                  value={email || ""}
                  onChange={handleEmailChange}
                />
                <span className="profile__input-error profile__input-error_type_email"></span>
              </label>
            </fieldset>
            <button type="submit" className="profile__submit-button">
              {buttonText}
            </button>
          </form>
          <a href="signout" className="profile__link">
          Выйти из аккаунта
          </a>
        </div>
      </section>
    </>
  );
}
