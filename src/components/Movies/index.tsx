import { observer, useLocalObservable } from "mobx-react-lite";
import * as React from "react";
import { ButtonPagination } from "../Button/Pagination/ButtonPagination";
import { Header } from "../Header/Header";
import { MovieList } from "../MovieList/MovieList";
import "./index.css";
import Store from "./store";


export interface IMovieProps {
	poster_path: string;
	id: number;
	title: string;
}

export interface IFilteredMovie {
	poster_path: string;
	id: number;
}

export const Movies = () => {
	const store = useLocalObservable(() => new Store());
	const timeToSearch = 2000;
	const refTimeout = React.useRef<NodeJS.Timeout>();

	const nextPage = ()=>{
		store.listShelf.nextPage();
	};
	const previousrPage = ()=>{
		store.listShelf.previousPage();
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
		const eventValue = event.target.value;
		window.clearTimeout(refTimeout.current);
		refTimeout.current = setTimeout(() => {
			store.search.setValue(eventValue);
			store.listShelf.refresh();
		}, timeToSearch);
	};

	return (
		<section className="container-section">
			<Header
				loading={store.listShelf.loader.isLoading}
				filter={handleChange}
			/>
			<MovieList movies={store.listShelf.items} />
			<ButtonPagination
				page={store.listShelf.page}
				next={nextPage}
				previous={previousrPage}
			/>
		</section>
	);
};

export default observer(Movies);
