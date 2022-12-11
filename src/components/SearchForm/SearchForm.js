import React, { useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm({
  MoviesArr,
  handleSubmitForm,
  handleCheckboxStatus,
}) {
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [newValue, setNewValue] = useState("");

  // получение изначального состояния чекбокса и инпута
  useEffect(() => {
    setIsShortFilm(JSON.parse(localStorage.getItem(`${MoviesArr}Checkbox`)));
    setNewValue(JSON.parse(localStorage.getItem(`${MoviesArr}Search`)));
  }, [MoviesArr]);

  // смена чекбокса
  function handleCheckboxChange() {
    handleCheckboxStatus(!isShortFilm);
    setIsShortFilm(!isShortFilm);
    localStorage.setItem(`${MoviesArr}Checkbox`, JSON.stringify(!isShortFilm));
  }

  // управление инпутом
  const handleChange = (evt) => {
    const value = evt.target.value;
    setNewValue(value);
    setValidationMessage(evt.target.validationMessage);
    localStorage.setItem(`${MoviesArr}Search`, JSON.stringify(value));
  };

  // отправка формы
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSubmitForm(MoviesArr, newValue, isShortFilm);
  };

  return (
    <section className="search-form">
      <div className="search-form__section">
        <form
          className="search-form__form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="search-form__fieldset">
            <input
              className={`search-form__input ${
                validationMessage ? "search-form__input_type_error" : ""
              }`}
              required
              type="text"
              placeholder="Введите название фильма"
              name="movie"
              value={newValue || ""}
              onChange={handleChange}
            />
            {validationMessage && (
              <span className="search-form__input-error">
                {validationMessage}
              </span>
            )}
          </fieldset>
          <button
            type="submit"
            className={`search-form__button ${
              validationMessage && "search-form__button_disabled"
            }`}
            disabled={validationMessage}
          >
            Найти
          </button>
        </form>
        <FilterCheckbox
          isChecked={isShortFilm}
          handleCheckboxStatus={handleCheckboxChange}
        />
        <span className="search-form__line" />
      </div>
    </section>
  );
}
