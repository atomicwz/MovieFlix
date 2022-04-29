import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import StoreDetail from "./detailStore";
import { Box, Button, Flex, Input, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import {BsPlay, BsSearch } from "react-icons/bs";
import UseImageColor from "use-image-color";

export interface IMovieDetail {
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	runtime: number;
	genres: IGenre[];
	vote_average: number;
	release_date: string;
	popularity: number;
}
interface IGenre {
	name: string;
	id: number;
}

export const MovieDetail = () => {
	const { id } = useParams();
	const store = useLocalObservable(() => new StoreDetail(id));
	const url = store.details.model.value ? `https://image.tmdb.org/t/p/w300${store.details.fetchedModel.backdrop_path}` : "nao";
	const { colors } =	UseImageColor(url, { cors: true, colors: 10});
	const navigate = useNavigate();
	const handleClick = () =>{
		navigate("/");
	};

	return (
		<>
			{store.details.model.value ? (
				<Box
					bg={`radial-gradient( transparent 50%, ${colors ? colors[1] : "transparent"} 95%),url(https://image.tmdb.org/t/p/original${store.details.fetchedModel.backdrop_path})`}
					bgRepeat="no-repeat"
					bgSize="cover"
					bgPosition="center"
					color="white"
					h="100vh"
					position="relative"
				>
					<Box bg={colors ? colors[0] : "transparent"}>
						<Flex
							alignItems="center"
							mx="auto"
							justifyContent="space-between"
							maxW="80%"
							padding={3}
						>
							<Text
								color="white"
								textTransform="uppercase"
							>Ideum
							</Text>
							<Flex gap={8}>
								<Input
									textAlign="right"
									variant="unstyled"
									placeholder="FILTER"
									_placeholder={{color:"white"}}
								/>
								<BsSearch color="white" size={35} />
							</Flex>
						</Flex>
					</Box>

					<Box
						position="relative"
						w={{
							sm: "80%",
							md: "70%",
							lg: "50%",
							xl: "40%",
						}}
						marginTop={{
							sm: 5,
							md: 40,
						}}
						marginLeft={{
							sm:"10%",
							md:"20%",
						}}
						padding={7}
						bg={`radial-gradient(circle, transparent 1%,  ${colors ? colors[1] : "transparent"} 120%)`}
					>
						<Text
							fontSize="3xl"
							color="secondary.800"
						>
							{store.details.fetchedModel.popularity.toString().substring(0,2)}%
						</Text>
						<Flex alignItems="center" gap={20}>
							<Text fontSize="4xl">
								{store.details.fetchedModel.title}
							</Text>

							<Text
								color={colors ? colors[0] : "transparent"}
								fontSize="4xl"
							>
								{store.details.fetchedModel.release_date.substring(0,4)}
							</Text>
						</Flex>

						<Box
							my={15}
							bg="rgba(0,0,0,.4)"
							maxW="30%"
						>
							<UnorderedList
								padding={0}
								listStyleType="none"
								display="flex"
								gap="10px"
								flexFlow="row wrap"
							>
								{store.details.fetchedModel.genres.map((genre: IGenre) => <ListItem key={genre.id} textTransform="uppercase" color="white" >{genre.name}</ListItem>)}
							</UnorderedList>
						</Box>
						<Text color="#fff" my={8}>
							{store.details.fetchedModel.overview}
						</Text>

						<Button
							borderRadius={2}
							color={colors ? colors[5] : "transparent"}
							borderColor={colors ? colors[5] : "transparent"}
							variant='outline'
							_hover={{borderColor:"white", color:"white"}}
							_focus={{borderColor:"gray.500"}}
						>
							<BsPlay />TRAILLER
						</Button>
					</Box>
					<Flex
						justifyContent="flex-end"
						onClick={handleClick}
						_hover={{color: "gray.500"}}
						alignItems="center"
						w="90%"
						gap={4}
					>
						<Box
							bg="rgba(0,0,0,.8)"
							mt={2}
							padding={2}
							display="inline-block"
							borderRadius="5px"
							_hover={{bg:"rgba(0,0,0,.3)"}}
						>
							<Text
								cursor="pointer"
								color="white"
								fontSize="2xl"
							>Home →
							</Text>
						</Box>
					</Flex>
				</Box>
			) : (
				"Não encontrado"
			)}

		</>
	);
};

export default observer(MovieDetail);

