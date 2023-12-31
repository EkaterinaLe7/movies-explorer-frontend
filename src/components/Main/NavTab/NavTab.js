import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li>
          <a className="navtab__link" href="#about-project">
            О&nbsp;проекте
          </a>
        </li>
        <li>
          <a className="navtab__link" href="#techs">
            Технологии
          </a>
        </li>
        <li>
          <a className="navtab__link" href="#about-me">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
