import * as React from "react";
import { getMovies, getMoviesSearcheds } from "../../services/api";
import { ButtonPagination } from "../Button/Pagination/ButtonPagination";
import { Header } from "../Header/Header";
import { MovieFiltered } from "../MovieFiltered/MovieFiltered";
import { MovieList } from "../MovieList/MovieList";
import "./index.css";

export interface IMovieProps{
  poster_path: string
  id: number
}


export const Movies = () => {
  const timeToSearch = 2000;
  const [page, setPage] = React.useState<number>(1);
  const [movies, setMovies] = React.useState<IMovieProps[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [filteredMovies, setFilteredMovies] = React.useState<any>([]);

  React.useEffect(() => {
    const fetch = async () => {
      setLoading(false)
      const data = await getMovies(page);
      setMovies(data);
    };
    fetch();
  }, [page]);
  
  function nextPage() {
    if (page === 6) return;
    setPage(page + 1);
  }
  function previousrPage() {
    if (page === 1) return;
    setPage(page - 1);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const eventValue = event.currentTarget.value;
    setLoading(true)
    setSearch(eventValue);
    setTimeout(() => {
      if (eventValue === "") return setLoading(false);
      filterMovies(eventValue);
    }, timeToSearch);
  }

  async function filterMovies(search: any) {
    const filtereds = await getMoviesSearcheds(search);
    setFilteredMovies(filtereds.results);
    setLoading(false)
  }
  
  return (
    <section className="container-section">
      <Header loading={loading}filter={handleChange}/>
      { search ? (
        <MovieFiltered filteredMovies={filteredMovies} />
      ) : (
        <>
          <MovieList movies={movies} />
          <ButtonPagination  next={nextPage} previous={previousrPage} page={page}/>
        </>
      )}
    </section>
  );
};
