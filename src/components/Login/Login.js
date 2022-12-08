import React from "react";
import "./Login.css";
import Form from "../Form/Form";
import Header from "../Header/Header";

export default function Login({ handleSubmitForm, isLoading, errorType }) {
  return (
    <>
      <Header />
      <main className="main">
        <section className="login">
          <h1 className="login__title">Рады видеть!</h1>
          <Form
            handleSubmitForm={handleSubmitForm}
            isLoading={isLoading}
            errorType={errorType}
            formType={""}
            submitButtonText={"Войти"}
          />
          <div className="login__container">
            <h2 className="login__subtitle">Ещё не зарегистрированы?</h2>
            <a href="/signup" className="login__link">
              Регистрация
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
