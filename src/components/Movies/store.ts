import { AttributeShelf, PaginatedListShelf } from "@startapp/mobx-utils";
import { makeAutoObservable } from "mobx";
import { IMovieProps } from ".";
import { getMovies, getMoviesSearcheds } from "../../services/api";

export default class Store {
	public listShelf: PaginatedListShelf<IMovieProps>;
	public search: AttributeShelf<string>;

	constructor() {
		makeAutoObservable(this);

		this.search = new AttributeShelf("");
		this.listShelf = new PaginatedListShelf((page) =>{
			if (this.search.value){
				return getMoviesSearcheds(this.search.value);
			} return getMovies(page + 1);
		},
		{
			fetchOnConstructor: true,
		},
		);
	}
}
