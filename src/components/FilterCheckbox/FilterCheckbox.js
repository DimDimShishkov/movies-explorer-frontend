import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ isChecked, handleCheckboxStatus }) {
  return (
    <div className="filter-checkbox">
      <div
        className={`filter-checkbox__checkbox ${
          isChecked && "filter-checkbox__checkbox_active"
        }`}
        onClick={handleCheckboxStatus}
      />
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}
