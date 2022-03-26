import React from "react";
import { Link } from "react-router-dom";
import styled from './MovieFiltered.module.css'

export const MovieFiltered = ({ filteredMovies }: any) => {
  return (
    <ul className={styled.movie}>
      {filteredMovies.map((movie: any, key: any) => {
        return (
          <Link to={`/movie/${movie.id}`}>
            <li key={key}>
              <img
                src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                alt="Filme"
              />
            </li>
          </Link>
        );
      })}
    </ul>
  );
};  
