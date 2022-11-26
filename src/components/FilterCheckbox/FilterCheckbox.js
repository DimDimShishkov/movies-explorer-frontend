import React, { useState } from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({checkboxCodition}) {
  const [isChecked, setChecked] = useState(false);

  const handleChangeCondition = () => {
    setChecked(!isChecked);
    checkboxCodition(!isChecked)
  }
  
  return (
    <div className="filter-checkbox">
        <div
          className={`filter-checkbox__checkbox ${
            isChecked && "filter-checkbox__checkbox_active"
          }`}
          onClick={handleChangeCondition}
        />
        <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}
