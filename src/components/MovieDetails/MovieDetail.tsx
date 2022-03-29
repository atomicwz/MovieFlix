import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import { ButtonHome } from "../Button/Home/ButtonHome";
import styled from "./MovieDetail.module.css";
import { ReactComponent as Star } from "../../Assets/Star.svg";
import { ReactComponent as Clock } from "../../Assets/clock.svg";
import { ReactComponent as Calendar } from "../../Assets/calendar.svg";

interface IMovieDetail {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: number;
  genres: Array<IGenre>;
  vote_average: number;
  release_date: string;
}

interface IGenre {
  name: string;
  id: number;
}

export const MovieDetail = () => {
  const [movie, setMovie] = useState<IMovieDetail>({
    title: "",
    overview: "",
    poster_path: "",
    backdrop_path: "",
    runtime: 0,
    genres: [],
    vote_average: 0,
    release_date: "",
  });

  const { id } = useParams();

  useEffect(() => {
    async function renderMovie() {
      const response = await getMovieDetails(id!);
      setMovie(response);
    }
    renderMovie();
  }, []);

  return (
    <>
      <section
        className={styled.sectionDetail}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className={styled.description}>
          {movie.poster_path && (
            <img
              className={styled.poster}
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt="Filme"
            />
          )}

          <h1>{movie.title}</h1>
          <div>
            <ul className={styled.genres}>
              {movie.genres
                ? movie.genres.map((item: IGenre) => {
                    return (

                      <li key={item.id}>
                        {item.name}
                      </li>
                    );
                  })
                : "Gênero não encontrado."}
            </ul>
          </div>
          <div className={styled.containerDescript}>
            <div className={styled.divIcons}>
              <Star className={styled.icons} />
              <p className={styled.votes}>{movie.vote_average}</p>{" "}
            </div>

            <div className={styled.divIcons}>
              <Clock className={styled.icons} />
              <p>{movie.runtime} Min</p>
            </div>

            <div className={styled.divIcons}>
              <Calendar className={styled.icons} />
              <p>{movie.release_date}</p>
            </div>
          </div>
          <p className={styled.sinopse}>{movie.overview}</p>
          <ButtonHome />
        </div>
        
      </section>
    </>
  );
};
