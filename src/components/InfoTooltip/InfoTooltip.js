import React from "react";
import "./InfoTooltip.css";
import { usePopupClose } from "../../hooks/usePopupClose";

function InfoTooltip({ isOpen, onClose, sign, text }) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button-close"
          onClick={onClose}
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
