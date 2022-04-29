import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Loading from "../Loading/Loading";
import { IMovieProps } from "../Movies/index";

export interface IMovieList {
	movies: IMovieProps[];
	nextPage: any;
}

export const MovieList: React.FC<IMovieList> = (props) =>{
	const [allFavorites, setAllFavorites] = useState<string[]>();

	useEffect(() => {
		const myFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
		setAllFavorites(myFavorites);
	}, []);

	useEffect(()=>{
		const intersectionObserver = new IntersectionObserver((entries) => {
			if ((entries.some((entry) => entry.isIntersecting))){
				props.nextPage.nextPage();
			}
		});
		intersectionObserver.observe(document.querySelector("#divscroll"));
		return ()=> intersectionObserver.disconnect();
	},[]);

	const handleClickFavorites = (movieId: string) => {
		const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

		if (favorites.includes(movieId)) {
			const newFavorites = favorites.filter((favorite) => favorite !== movieId);
			localStorage.setItem("favorites", JSON.stringify(newFavorites));
			setAllFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
			return;
		}
		const newFavorites = [...favorites, movieId];
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
		setAllFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
	};
	return (
		<>
			<Grid gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr))">
				{props.movies.map((movie: IMovieProps) => (
					<Box key={movie.id}>
						<Box fontSize="lg" position="relative" color="white">
							<Button
								_focus={{border: "none"}}
								borderRadius="0 0 5px 5px"
								position="absolute"
								right="10px"
								onClick={()=> handleClickFavorites(movie?.id)}
								bg="rgba(0,0,0,.6)"
							>
								{allFavorites?.includes(movie?.id) ? "❤️" : "Favoritar?"}
							</Button>
							<Link to={`/movie/${movie.id}`}>
								<Box
									position="absolute"
									background="rgba(0,0,0,.8)"
									fontWeight="400"
									left="10px"
									borderRadius="0 0 5px 5px"
									_hover={{ background: "rgba(0,0,0,.6)" }}
									p={1}
								>
									<Text>
										⭐{movie.vote_average}
									</Text>
								</Box>
								<Image w="100%" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
							</Link>
						</Box>
					</Box>
				))}
			</Grid >
			<Flex
				id="divscroll"
				height={20}
				background="black"
				justifyContent="center"
				alignItems="center"
			>
				<Button
					isLoading
					loadingText='Carregando'
					colorScheme='teal'
					variant='outline'
				>
					Submit
				</Button>
			</Flex>
		</>
	);
};

export default observer(MovieList);
