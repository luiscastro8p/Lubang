import { delay, map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  private apikey = "AIzaSyAS195NxI6fi6GWqLR2OfZeR0rQ2jcE-So";
  public items: any = [];
  constructor() {}

  nuevoUsuario(value) {
   
  }
  login(value) {
    console.log(value);

  
  }
  filterItems(searchTerm) {
    return this.items.filter((item) => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
