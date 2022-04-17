import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import { ButtonHome } from "../Button/Home/ButtonHome";
import styled from "./MovieDetail.module.css";
import { ReactComponent as Star } from "../../Assets/Star.svg";
import { ReactComponent as Clock } from "../../Assets/clock.svg";
import { ReactComponent as Calendar } from "../../Assets/calendar.svg";
import { observer, useLocalObservable } from "mobx-react-lite";
import Store from "./detailStore";

export interface IMovieDetail {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: number | null;
  genres: Array<IGenre>;
  vote_average: number;
  release_date: string | null;
}

interface IGenre {
  name: string;
  id: number;
}

export const MovieDetail = observer(() => {

  const { id } = useParams();
  const store = useLocalObservable(() => new Store(id));

  return (
    <>
      {store.details.model.value ? (
        <section
          className={styled.sectionDetail}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${store.details.fetchedModel.backdrop_path})`,
          }}
        >
          <div className={styled.description}>
            <h1>{store.details.fetchedModel.title}</h1>
            <div>
              <ul className={styled.genres}>
                {store.details.fetchedModel.genres.map((item: IGenre) => {
                  return <li key={item.id}>{item.name}</li>;
                })}
              </ul>
            </div>
            <div className={styled.containerDescript}>
              <div className={styled.divIcons}>
                <Star className={styled.icons} />
                <p className={styled.votes}>
                  {store.details.fetchedModel.vote_average}
                </p>{" "}
              </div>

              <div className={styled.divIcons}>
                <Clock className={styled.icons} />
                <p>{store.details.fetchedModel.runtime} Min</p>
              </div>

              <div className={styled.divIcons}>
                <Calendar className={styled.icons} />
                <p>{store.details.fetchedModel.release_date}</p>
              </div>
            </div>
            <p className={styled.sinopse}>{store.details.fetchedModel.overview}</p>
            <ButtonHome />
          </div>
        </section>
      ) : (
        "bunda"
      )}

    </>
  );
});
