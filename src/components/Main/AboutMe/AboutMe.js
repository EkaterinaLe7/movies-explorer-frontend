import React from "react";
import "./AboutMe.css";
import Title from "../Title/Title";
import MyFoto from "../../../images/SVA_5080.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <Title text="Студент" />
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Екатерина</h3>
          <p className="about-me__occupation">Фронтенд-разработчик</p>
          <p className="about-me__description">
            Меня зовут Екатерина. Я из города Санкт-Петербург. 
            Я люблю велосипед, йогу и изучение языков, ещё
            увлекаюсь вязанием. С недавнего времени изучаю веб-разработку.
            Считаю эту профессию интересной и перспективной. Хочу и дальше в ней
            развиваться. На данный момент прохожу курс в Яндекс Практикум.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/EkaterinaLe7"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__photo" src={MyFoto} alt="Фото" />
      </div>
    </section>
  );
}

export default AboutMe;
