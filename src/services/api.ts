import { IMovieProps } from "../components/Movies";

const apiBase = "https://api.themoviedb.org/3/";
const key = "ce9e76215598d8b49192a706d6b13bdc";
const moviesList = `discover/movie?api_key=${key}&language=pt-BR`;


export const getMovies = async (page: number): Promise<IMovieProps[]> => {
	const response = await fetch(`${apiBase}${moviesList}&page=${page}`);
	const json = await response.json();
	return json.results;
};

export const getMoviesSearcheds = async (search: string): Promise<IMovieProps[]> =>{
	const response = await fetch(`${apiBase}search/movie?api_key=${key}&query=${search}`);
	const json = await response.json();
	return json.results;
};

export const getMovieDetails = async (movie_id: string) =>{
	const response = await fetch(`${apiBase}movie/${movie_id}?api_key=${key}&language=pt-BR`);
	const json = await response.json();
	return json;
};

export const getMovieTopRated = async (): Promise<IMovieProps[]> =>{
	const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=ce9e76215598d8b49192a706d6b13bdc&language=en-US&page=2");
	const json = await response.json();
	return json.results;
};
