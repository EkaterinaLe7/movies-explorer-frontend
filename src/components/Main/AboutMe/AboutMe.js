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
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы. 
            Меня зовут Екатерина. Я из города Санкт-Петербург. У меня есть муж.
            Я люблю кататься на велосипеде, йогу и изучение языков, ещё
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
