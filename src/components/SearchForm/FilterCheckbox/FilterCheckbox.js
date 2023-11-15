import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isFilterChecked, onCheck }) {
  return (
    <form className="filter">
      <label className="filter__switch">
        <input
          type="checkbox"
          className="filter__input"
          checked={isFilterChecked}
          onChange={onCheck}
        />
        <span className="filter__slider filter__round"></span>
      </label>
      <span className="filter__text">Короткометражки</span>
    </form>
  );
}

export default FilterCheckbox;
