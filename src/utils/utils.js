import {
  ERROR_409,
  ERROR_404,
  ERROR_401,
  ERROR_400,
  SERVER_ERROR,
  FILM_DURATION
} from "./constants";

export function filterMovies(movies) {
  return movies.filter((movie) => movie.duration < FILM_DURATION);
}

export function searchMovies(movies, searchText) {
  const text = searchText.toLowerCase().trim();
  const filteredMovies = movies.filter((movie) => {
    const movieRU = movie.nameRU.toLowerCase().trim();
    const movieEN = movie.nameEN.toLowerCase().trim();
    return movieRU.includes(text) || movieEN.includes(text);
  });

  return filteredMovies;
}

export const handleErrorsUser = (err, setInfoTooltipText) => {
  if (err === "Ошибка: 409") {
    setInfoTooltipText(ERROR_409);
  } else if (err === "Ошибка: 400") {
    setInfoTooltipText(ERROR_400);
  } else if (err === "Ошибка: 401") {
    setInfoTooltipText(ERROR_401);
  } else if (err === "Ошибка: 404") {
    setInfoTooltipText(ERROR_404);
  } else {
    setInfoTooltipText(SERVER_ERROR);
  }
};

export function convertMovieDuration(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours === 0) {
    return `${minutes}м`;
  } else if (minutes === 0) {
    return `${hours}ч`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}
