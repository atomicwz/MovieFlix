import { Flex } from "@chakra-ui/react";
import { observer, useLocalObservable } from "mobx-react-lite";
import * as React from "react";
import { Banner } from "../Banner/Banner";
import { Header } from "../Header/Header";
import { MovieList } from "../MovieList/MovieList";
import Store from "./store";
import UseImageColor from "use-image-color";
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
		>
			<Header
				color={colors ? colors[0] : "rgba(0,0,0,.3)"}
				loading={store.listShelf.loader.isLoading}
				filter={handleChange}
			/>
			{!store.search.value && <Banner url={store.urlImage} movies={store.movies} /> }

			<MovieList handleClick={store.handleClick} nextPage={store.listShelf} movies={store.listShelf.listItems}  />

		</Flex>
	);
};

export default observer(Movies);

