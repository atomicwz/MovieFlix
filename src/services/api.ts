const apiBase: string = "https://api.themoviedb.org/3/";
const key: string = "ce9e76215598d8b49192a706d6b13bdc";
const moviesList: string = `discover/movie?api_key=${key}&language=pt-BR`


export const getMovies = async (page: number) => {
  const response = await fetch(`${apiBase}${moviesList}&page=${page}`);
  const json = await response.json();
  return json.results;
};

export const getMoviesSearcheds = async (search: string) =>{
    const response = await fetch(`${apiBase}search/movie?api_key=${key}&query=${search.toLowerCase()}`);
    const json = await response.json();
    return json
}

export const getMovieDetails = async (movie_id: string) =>{
      const response = await fetch(`${apiBase}movie/${movie_id}?api_key=${key}&language=pt-BR`);
      const json = await response.json();
      return json
}