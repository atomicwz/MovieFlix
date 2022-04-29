/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Flex } from "@chakra-ui/react";
import { observer, useLocalObservable } from "mobx-react-lite";
import * as React from "react";
import { Banner } from "../Banner/Banner";
import { Header } from "../Header/Header";
import { MovieList } from "../MovieList/MovieList";
import Store from "./store";
import UseImageColor from "use-image-color";
// import UseImageColor from "use-image-color";
export interface IListShelf extends IMovieProps{
	favorite: boolean;
}

export interface IMovieProps {
	backdrop_path: string;
	poster_path: string;
	id: string;
	title: string;
	vote_average: number;
	favorite: boolean;
}

export interface IFilteredMovie {
	poster_path: string;
	id: number;
}
export const Movies = () => {
	const store = useLocalObservable(() => new Store());
	const timeToSearch = 2000;
	const refTimeout = React.useRef<NodeJS.Timeout>();
	const { colors } = UseImageColor(store.urlImage.value, { cors: true, colors: 5});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
		const eventValue = event.target.value;
		window.clearTimeout(refTimeout.current);
		refTimeout.current = setTimeout(() => {
			store.search.setValue(eventValue);
			store.listShelf.refreshItems();
		}, timeToSearch);
	};

	return (
		<Flex
			flexDirection='column'
			bg={colors ? colors[0] : "#fff"}
		>
			<Header
				loading={store.listShelf.loader.isLoading}
				filter={handleChange}
			/>
			{!store.search.value && <Banner url={store.urlImage} movies={store.movies} /> }

			<MovieList nextPage={store.listShelf} movies={store.listShelf.listItems}  />

		</Flex>
	);
};

export default observer(Movies);

