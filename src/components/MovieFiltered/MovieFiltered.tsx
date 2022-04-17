import React from "react";
import { Link } from "react-router-dom";
import { IFilteredMovie } from "../Movies";
import styled from "./MovieFiltered.module.css";

interface IProps {
  results: string
  filteredMovies: IFilteredMovie[]
}

export const MovieFiltered = (props:IProps) => {
  return (
    <ul className={styled.movie}>
      <h2 className={styled.results} >Resultado da busca "{props.results}"</h2>
      {props.filteredMovies.map((movie: IFilteredMovie) => {
        return (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <li>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
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
