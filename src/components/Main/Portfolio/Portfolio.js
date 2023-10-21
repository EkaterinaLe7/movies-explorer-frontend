import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__link-items">
        <li className="portfolio__link-item">
          Статичный сайт
          <a
            className="portfolio__link"
            href="https://github.com/EkaterinaLe7/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            ↗
          </a>
        </li>
        <li className="portfolio__link-item">
          Адаптивный сайт
          <a
            className="portfolio__link"
            href="https://github.com/EkaterinaLe7/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            ↗
          </a>
        </li>
        <li className="portfolio__link-item">
          Одностраничное приложение
          <a
            className="portfolio__link"
            href="https://github.com/EkaterinaLe7/mesto-react"
            target="_blank"
            rel="noreferrer"
          >
            ↗
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
