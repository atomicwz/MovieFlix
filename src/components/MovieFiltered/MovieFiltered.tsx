import React from "react";
import { Link } from "react-router-dom";
import styled from "./MovieFiltered.module.css";

interface IMovieFiltered {
  filteredMovies: object;
  id: number;
  poster_path: number;
}

export const MovieFiltered = (props:any) => {
  return (
    <ul className={styled.movie}>
      {props.filteredMovies.map((movie: any, key: any) => {
        return (
          <Link to={`/movie/${movie.id}`}>
            <li key={key}>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                  alt="Filme"
                />
              )}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
