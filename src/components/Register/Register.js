import React from "react";
import Form from "../Form/Form";
import Header from "../Header/Header";
import "./Register.css";

export default function Register({ handleSubmitForm, isLoading, errorType }) {
  return (
    <>
      <Header />
      <section className="main">
        <section className="register">
          <h1 className="register__title">Добро пожаловать!</h1>
          <Form
            handleSubmitForm={handleSubmitForm}
            isLoading={isLoading}
            errorType={errorType}
            formType={"register"}
          />
          <div className="register__container">
            <h2 className="register__subtitle">Уже зарегистрированы?</h2>
            <a href="/signin" className="register__link">
              Войти
            </a>
          </div>
        </section>
      </section>
    </>
  );
}
