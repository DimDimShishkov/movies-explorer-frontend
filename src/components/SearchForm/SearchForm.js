import React, { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm() {
  const [isShortFilms, setShortFilms] = useState(false)

  return (
    <section className="search-form">
      <div className="search-form__section">
        <div className="search-form__content">
          <form className="search-form__form">
            <div className="search-form__search">
              <div className="search-form__loupe" />
              <input placeholder="Фильм" className="search-form__input" />
            </div>
            <button type="submit" className="search-form__button"></button>
          </form>
          <span className="search-form__separate" />
          <FilterCheckbox checkboxCodition={setShortFilms}/>
        </div>
        <span className="search-form__line" />
      </div>
    </section>
  );
}
