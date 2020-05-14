import { delay, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  HttpClient
} from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  private apikey = "AIzaSyAS195NxI6fi6GWqLR2OfZeR0rQ2jcE-So";

  constructor(private http: HttpClient) {}

  
  nuevoUsuario(value) {
    console.log(value);
    
    return this.http
      .post(`${this.url}/login `, value)
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }
  login(value) {
console.log(value);

    return this.http
      .post(`${this.url}/login`, value)
      .pipe(
        map(resp => {
            console.log(resp)
          return resp;
        })
      );
  }
}
