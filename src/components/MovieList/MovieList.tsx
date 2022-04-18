import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { IMovieProps } from "../Movies/index";
import styled from "./MovieList.module.css";

interface IMovieList {
	movies: IMovieProps[];
}

export const MovieList: React.FC<IMovieList> =  (props) => (
	<div className="lista">
		<ul className={styled.movie}>
			{props.movies.map((movie: IMovieProps) => (
				<Link key={movie.id} to={`/movie/${movie.id}`}>
					<li>
						<img
							src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
							alt={movie.title}
						/>
					</li>
				</Link>
			))}
		</ul>
	</div>
);

export default observer(MovieList);
