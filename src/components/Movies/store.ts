import { AttributeShelf, InfinityScrollShelf, PaginatedListShelf } from "@startapp/mobx-utils";
import { makeAutoObservable } from "mobx";
import { IListShelf, IMovieProps } from ".";
import { getMovies, getMoviesSearcheds, getMovieTopRated } from "../../services/api";

export default class Store {
	public listShelf: InfinityScrollShelf<IListShelf>;
	public movies: PaginatedListShelf<IMovieProps>;
	public search: AttributeShelf<string>;
	public urlImage: AttributeShelf<string>;
	public favorites: AttributeShelf<number[]>;

	public handleClick = (movie: IListShelf): string[] => {
		const arrayFilter = (arr: string[], moviesID: string): string[] => arr.filter((item) => item !== moviesID);
		movie.favorite= !movie.favorite;
		let arrayFavorite: string[] = JSON.parse(localStorage.getItem("moviesID")) || [];
		if (movie.favorite === true) {
			arrayFavorite.push(movie.id);
			localStorage.setItem("moviesID",JSON.stringify(arrayFavorite));
			return arrayFavorite;
		} else {
			arrayFavorite = arrayFilter(arrayFavorite, movie.id);
			localStorage.setItem("moviesID",JSON.stringify(arrayFavorite));
			return arrayFavorite;
		}
	};

	constructor() {
		makeAutoObservable(this);
		this.search = new AttributeShelf("");
		this.urlImage = new AttributeShelf("");
		this.movies = new PaginatedListShelf(()=> getMovieTopRated(),{fetchOnConstructor: true});
		this.listShelf = new InfinityScrollShelf(async (page) => {
			const moviesFavorite = JSON.parse(localStorage.getItem("moviesID"));
			let moviesList: IMovieProps[] = [];
			if (this.search.value){
				moviesList = await getMoviesSearcheds(this.search.value);
			} else {
				moviesList = await getMovies(page + 1);
			}
			return moviesList.map((movie)=>{
				const favorites = moviesFavorite.includes(movie.id);
				return {...movie,
					favorite: favorites};
			},
			);
		},
		{
			fetchOnConstructor: true,
		},
		);
	}
}

