import { PaginatedListShelf } from "@startapp/mobx-utils";
import {  makeAutoObservable} from "mobx";
import { IMovieProps } from ".";
import { getMovies } from "../../services/api";


export default class Store {
  public page: number;
  public listShelf: PaginatedListShelf<IMovieProps>;

  constructor() {
    makeAutoObservable(this);
    this.listShelf = new PaginatedListShelf((page) => getMovies(page + 1),{ fetchOnConstructor: true });
  }
  
}
