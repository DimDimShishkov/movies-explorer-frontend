import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Form.css";

export default function Form({
  handleSubmitForm,
  isLoading,
  errorType,
  formType,
}) {
  const [buttonText, setButtonText] = useState("Зарегистрироваться");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => handleSubmitForm(data);

  useEffect(() => {
    if (isLoading) {
      setButtonText("Загрузка...");
    } else {
      setButtonText("Зарегистрироваться");
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

  let content;
  if (formType === "register") {
    content = (
      <label className="form__label">
        <p className="form__title">Имя</p>
        <input
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
          className={`form__input ${
            errors.name ? "form__input_type_error" : ""
          }`}
          placeholder="Введите имя профиля"
          id="name"
          type="text"
        />
        {errors.name && (
          <span className="form__input-error">{errors.name.message}</span>
        )}
      </label>
    );
  } else {
    content = <></>;
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="form__fieldset">
        {content}
        <label className="form__label">
          <p className="form__title">E-mail</p>
          <input
            {...register("email", {
              required: "Поле обязательно к заполнению.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Неправильный формат почты.",
              },
            })}
            className={`form__input ${
              errors.email ? "form__input_type_error" : ""
            }`}
            placeholder="Введите e-mail"
            id="email"
            type="email"
          />
          {errors.email && (
            <span className="form__input-error">{errors.email.message}</span>
          )}
        </label>
        <label className="form__label">
          <p className="form__title">Пароль</p>
          <input
            {...register("password", {
              required: "Поле обязательно к заполнению.",
            })}
            className={`form__input ${
              errors.password ? "form__input_type_error" : ""
            }`}
            placeholder="Введите пароль"
            id="password"
            type="password"
          />
          {errors.password && (
            <span className="form__input-error">{errors.password.message}</span>
          )}
        </label>
      </fieldset>
      <div className="form__submit-container">
        {errorMessage && (
          <span className="form__submit-error">{errorMessage}</span>
        )}
        <button
          type="submit"
          className={`form__submit-button ${
            !isValid && "form__submit-button_disabled"
          } `}
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}
