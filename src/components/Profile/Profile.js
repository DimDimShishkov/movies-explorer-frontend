import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";
import Header from "../Header/Header";
import "./Profile.css";

export default function Profile({
  handleSubmitForm,
  isLoading,
  errorType,
  handleLoggegOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [buttonText, setButtonText] = useState("Сохранить");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [newValue, setNewValue] = useState({});
  let nameReg = /^[a-za-яё -]+$/i;
  let emailReg = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;

  useEffect(() => {
    setNewValue({
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name,
    });
  }, []);

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
      setButtonText("Загрузка...");
    } else {
      setButtonText("Сохранить");
    }
  }, [isLoading]);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setNewValue({ ...newValue, [name]: value });
    if (name === "name" && !nameReg.test(value)) {
      setIsFormValid(false);
      return setValidationMessage({
        ...validationMessage,
        [name]:
          "Имя должно состоять из латиницы, кириллицы, пробелов или дефисов.",
      });
    }
    if (name === "email" && !emailReg.test(value)) {
      setIsFormValid(false);
      return setValidationMessage({
        ...validationMessage,
        [name]: "Неправильный формат почты.",
      });
    }
    setValidationMessage({
      ...validationMessage,
      [name]: evt.target.validationMessage,
    });
    if (!validationMessage.name && !validationMessage.email) {
      setIsFormValid(true);
    }
    console.log(newValue);
  };

  let submitButtonContent;
  if (isFormValid) {
    submitButtonContent = (
      <div className="profile__submit-container">
        {errorMessage && (
          <span className="profile__submit-error">{errorMessage}</span>
        )}
        <button
          type="submit"
          className={`profile__submit-button ${
            !isFormValid && "profile__submit-button_disabled"
          } `}
          disabled={!isFormValid}
        >
          {buttonText}
        </button>
      </div>
    );
  } else {
    submitButtonContent = (
      <div className="profile__submit-container">
        <span className="profile__span">Редактировать</span>
        <span onClick={() => handleLoggegOut()} className="profile__link">
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

// <form
//               autoComplete="off"
//               className="profile__form"
//               onSubmit={onSubmit}
//               onChange={handleChange}
//             >
//               <fieldset className="profile__fieldset">
//                 <label className="profile__label">
//                   <p className="profile__title">Имя</p>

//                   <input
//                     {...register("name", {
//                       required: "Поле обязательно к заполнению.",
//                       minLength: {
//                         value: 2,
//                         message: "Минимальная длина имени 2 символа.",
//                       },
//                       maxLength: {
//                         value: 30,
//                         message: "Максимальная длина имени 30 символов.",
//                       },
//                       pattern: {
//                         value: /^[a-za-яё -]+$/i,
//                         message:
//                           "Имя должно состоять из латиницы, кириллицы, пробелов или дефисов.",
//                       },
//                     })}
//                     defaultValue={currentUser.name}
//                     className="profile__input"
//                     placeholder="Введите новое имя"
//                     type="text"
//                   />
//                   {errors.name && (
//                     <span className="profile__input-error">
//                       {errors.name.message}
//                     </span>
//                   )}
//                 </label>

//                 <span className="profile__line" />

//                 <label className="profile__label">
//                   <p className="profile__title">E-mail</p>
//                   <input
//                     {...register("email", {
//                       required: "Поле обязательно к заполнению.",
//                       pattern: {
//                         value:
//                           /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
//                         message: "Неправильный формат почты.",
//                       },
//                     })}
//                     defaultValue={currentUser.email}
//                     className="profile__input"
//                     placeholder="Введите новый e-mail"
//                     type="email"
//                     onChange={handleChange}
//                   />
//                   {errors.email && (
//                     <span className="profile__input-error">
//                       {errors.email.message}
//                     </span>
//                   )}
//                 </label>
//               </fieldset>
//               {submitButtonContent}
//             </form>
