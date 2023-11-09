export function filterMovies(movies, isFilterChecked) {
    // if (isFilterChecked) {
    //     return movies.filter(movie => movie.duration < 40);
    // } else {
    //     return movies;
    // }
    return movies.filter(movie => movie.duration < 40);
  }


  export function searchMovies(movies, searchText, isFilterChecked) {
    
    const filteredMovies = movies.filter((movie) => 
    // const movieRu = movie.nameRU.toLowerCase().trim();
    movie.nameRU.toLowerCase().trim().includes(searchText.toLowerCase().trim()) || movie.nameEN.toLowerCase().trim().includes(searchText.toLowerCase().trim())
    );

    return filteredMovies;
  }
  
