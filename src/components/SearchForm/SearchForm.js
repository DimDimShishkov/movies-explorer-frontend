import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm({handleSubmitForm}) {
  const [isShortFilm, setIsShortFilm] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => handleSubmitForm(data.movie, isShortFilm);

  return (
    <section className="search-form">
      <div className="search-form__section">
        <form
          className="search-form__form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className="search-form__fieldset">
            <input
              {...register("movie", {
                required: "Нужно ввести ключевое слово.",
              })}
              className={`search-form__input ${
                errors.movie ? "search-form__input_type_error" : ""
              }`}
              placeholder="Фильм"
              id="movie"
              type="text"
            />
            {errors.movie && (
              <span className="search-form__input-error">
                {errors.movie.message}
              </span>
            )}
          </fieldset>
          <button type="submit" className="search-form__button">
            Найти
          </button>
        </form>
        <FilterCheckbox checkboxCodition={setIsShortFilm} />
        <span className="search-form__line" />
      </div>
    </section>
  );
}
