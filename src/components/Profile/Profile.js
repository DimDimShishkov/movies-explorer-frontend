import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";
import Header from "../Header/Header";
import "./Profile.css";

export default function Profile({ handleSubmitForm, isLoading, errorType }) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [buttonText, setButtonText] = useState("Сохранить");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => handleSubmitForm(data);

  let submitButtonContent;
  if (isValid) {
    submitButtonContent = (
      <div className="profile__submit-container">
        {errorMessage && (
          <span className="profile__submit-error">{errorMessage}</span>
        )}
        <button
          type="submit"
          className={`profile__submit-button ${
            !isValid && "profile__submit-button_disabled"
          } `}
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </div>
    );
  } else {
    submitButtonContent = (
      <div className="profile__submit-container">
        <span className="profile__span">Редактировать</span>
        <span onClick={() => console.log(123)} className="profile__link">
          Выйти из аккаунта
        </span>
      </div>
    );
  }

  useEffect(() => {
    if (isLoading) {
      setButtonText("Загрузка...");
    } else {
      setButtonText("Сохранить");
    }
  }, [isLoading]);

  useEffect(() => {
    if (errorType === 409) {
      setErrorMessage("Пользователь с таким email уже существует");
    } else if (errorType === 401) {
      setErrorMessage("Неправильные почта или пароль");
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
              onSubmit={handleSubmit(onSubmit)}
            >
              <fieldset className="profile__fieldset">
                <label className="profile__label">
                  <p className="profile__title">Имя</p>

                  <input
                    defaultValue={currentUser.name}
                    {...register("name", {
                      required: "Поле обязательно к заполнению.",
                      minLength: {
                        value: 2,
                        message: "Минимальная длина имени 2 символа.",
                      },
                      maxLength: {
                        value: 30,
                        message: "Максимальная длина имени 30 символов.",
                      },
                    })}
                    className="profile__input"
                    placeholder="Введите новое имя"
                    id="name"
                    type="text"
                  />
                  {errors.name && (
                    <span className="profile__input-error">
                      {errors.name.message}
                    </span>
                  )}
                </label>
                <span className="profile__line" />

                <label className="profile__label">
                  <p className="profile__title">E-mail</p>
                  <input
                    defaultValue={currentUser.email}
                    {...register("email", {
                      required: "Поле обязательно к заполнению.",
                    })}
                    className="profile__input"
                    placeholder="Введите новый e-mail"
                    id="email"
                    type="email"
                  />
                  {errors.email && (
                    <span className="profile__input-error">
                      {errors.email.message}
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
