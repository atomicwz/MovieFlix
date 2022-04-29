/* eslint-disable react/react-in-jsx-scope */
import "./style.css";
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { IMovieProps } from "../Movies";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { AttributeShelf, PaginatedListShelf } from "@startapp/mobx-utils";

interface IBanner{
	movies: PaginatedListShelf<IMovieProps>;
	url: AttributeShelf<string>;
}


export const Banner: React.FC<IBanner> = observer((props: IBanner) =>{
	const handleChange = (e)=>{
		const activeSlide = props.movies.items[e].backdrop_path;
		const url = `https://image.tmdb.org/t/p/original${activeSlide}`;
		props.url.setValue(url);
	};
	return (
		<>
			{props.movies.loader.isLoading ?
				"" :
				<Carousel
					autoPlay
					infiniteLoop
					showArrows={false}
					showStatus={false}
					swipeable
					swipeScrollTolerance={5}
					emulateTouch
					showThumbs={false}
					onChange={(e)=> handleChange(e)}
				>
					{props.movies.items.map((movie: IMovieProps)=>(

						<Box
							key={movie.id}
							w="100%"
							h="70vh"
							bg={`url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) no-repeat center`}
							bgSize="cover"
						>
							<Link to={`/movie/${movie.id}`}>
								<Box bg="rgba(0,0,0,.3)">
									<Text
										fontSize="5xl"
										fontWeight="600"
										color="white"
									>
										{movie.title}
									</Text>
								</Box>
							</Link>
						</Box>
					))}
				</Carousel > }

		</>
	);
});
