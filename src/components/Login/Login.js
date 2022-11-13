import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Зарегистрироваться");
  const [isLoading, setIsLoading] = useState(false);
  // валидация формы
  const [errorsName, setErrorsName] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isLoading) {
      setButtonText("Загрузка...");
    } else {
      setButtonText("Зарегистрироваться");
    }
    /*     onUpdateUser({
      name,
      about: description,
    }); */
  }

  return (
    <section className="register">
      <h1 className="register__title">Рады видеть!</h1>
      <form
        autoComplete="new-password"
        noValidate
        className="popup__form"
        onSubmit={handleSubmit}
      >
        <fieldset className="popup__fieldset">
          <label className="popup__label popup__label_value_email">
            <p className="popup__title">E-mail</p>
            <input
              required={true}
              type="email"
              className="popup__input"
              id="email"
              placeholder="Введите e-mail"
              value={email || ""}
              onChange={handleEmailChange}
            />
            <span className="popup__input-error popup__input-error_type_email"></span>
          </label>
          <label className="popup__label popup__label_value_password">
            <p className="popup__title">Пароль</p>

            <input
              required={true}
              type="password"
              className="popup__input"
              id="password"
              placeholder="Введите пароль"
              value={password || ""}
              onChange={handlePasswordChange}
            />
            <span className="popup__input-error popup__input-error_type_password"></span>
          </label>
        </fieldset>
        <div className="popup__submit-area">
          <button type="submit" className="popup__submit-button">
            {buttonText}
          </button>
          <div className="popup__links">
            <h2 className="popup__subtitle">Ещё не зарегистрированы?</h2>
            <a href="/signup" className="popup__link">
            Регистрация
            </a>
          </div>
        </div>
      </form>
    </section>
  );
}
