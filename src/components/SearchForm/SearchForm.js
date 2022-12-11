import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm() {
  const [isShortFilms, setShortFilms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => console.log(data);

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
                required: "Поле обязательно к заполнению.",
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
        <FilterCheckbox checkboxCodition={setShortFilms} />
        <span className="search-form__line" />
      </div>
    </section>
  );
}
