import { FetchModelShelf, PaginatedListShelf } from "@startapp/mobx-utils";
import { makeAutoObservable} from "mobx";
import { getMovieDetails} from "../../services/api";
import { IMovieDetail } from "./MovieDetail";



export default class Store {

  public details: FetchModelShelf<IMovieDetail>;

  constructor(id:string) {
    makeAutoObservable(this);
    this.details = new FetchModelShelf(id , (id) => getMovieDetails(id), { fetchOnConstructor: true });
  }
  
}
