import React from "react";
import { Link } from "react-router-dom";
import { IMovieProps } from "../Movies/index";
import styled from "./MovieList.module.css";

interface IMovieList{
  movies: IMovieProps[]
}


export const MovieList = (props: IMovieList) => {
  return (
    <div className="lista">
      <ul className={styled.movie}>
        {props.movies.map((movie: any, key: any) => {
          return (
            <Link key={key} to={`/movie/${movie.id}`}>
              <li>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                />
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
