import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter">
      <label className="filter__switch">
        <input type="checkbox" className="filter__input" />
        <div className="filter__slider filter__round"></div>
      </label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
