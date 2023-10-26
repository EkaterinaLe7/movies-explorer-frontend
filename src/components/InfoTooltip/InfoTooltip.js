import React from "react";
import "./InfoTooltip.css";

function InfoTooltip({ isOpen = false, sign, text }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button-close"
        ></button>
        <div className="popup__info-wrapper">
          <img className="popup__sign" src={sign} alt="Иконка" />
          <h2 className="popup__text">{text}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
