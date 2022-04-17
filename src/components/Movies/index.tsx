import { observer, useLocalObservable } from "mobx-react-lite";
import * as React from "react";
import { getMoviesSearcheds } from "../../services/api";
import { ButtonPagination } from "../Button/Pagination/ButtonPagination";
import { Header } from "../Header/Header";
import { MovieFiltered } from "../MovieFiltered/MovieFiltered";
import { MovieList } from "../MovieList/MovieList";
import "./index.css";
import Store from "./store";

export interface IMovieProps {
  poster_path: string;
  id: number;
  title: string;
}

export interface IFilteredMovie {
  poster_path: string;
  id: number;
}

export const Movies = observer(() => {
  const store = useLocalObservable(() => new Store());
  const timeToSearch = 2000;
  const refTimeout = React.useRef<NodeJS.Timeout>();
  const [search, setSearch] = React.useState<string>("");
  const [filteredMovies, setFilteredMovies] = React.useState<IFilteredMovie[]>(
    []
  );
  function nextPage() {
    store.listShelf.nextPage();
  }
  function previousrPage() {
    store.listShelf.previousPage();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const eventValue = event.target.value;
    setSearch(eventValue);
    window.clearTimeout(refTimeout.current);
    refTimeout.current = setTimeout(() => {
      filterMovies(eventValue);
    }, timeToSearch);
  }
  async function filterMovies(search: string) {
    const filtereds = await getMoviesSearcheds(search);
    setFilteredMovies(filtereds.results);
  }

  return (
    <section className="container-section">
      <Header
        loading={store.listShelf.loader.isLoading}
        filter={handleChange}
      />
      {search ? (
        <MovieFiltered results={search} filteredMovies={filteredMovies} />
      ) : (
        <>
          <MovieList movies={store.listShelf.items} />
          <ButtonPagination
            page={store.listShelf.page}
            next={nextPage}
            previous={previousrPage}
          />
        </>
      )}
    </section>
  );
});
