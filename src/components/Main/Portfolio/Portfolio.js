import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__link-items">
        <li className="portfolio__link-item">
          <a
            className="portfolio__link"
            href="https://github.com/EkaterinaLe7/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__link-text">↗</p>
          </a>
        </li>
        <li className="portfolio__link-item">
          <a
            className="portfolio__link"
            href="https://github.com/EkaterinaLe7/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__link-text">↗</p>
          </a>
        </li>
        <li className="portfolio__link-item">
          <a
            className="portfolio__link"
            href="https://github.com/EkaterinaLe7/mesto-react"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__link-text">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
