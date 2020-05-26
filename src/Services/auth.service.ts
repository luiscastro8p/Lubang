import { delay, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {Uris} from './Uris'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  private apikey = "AIzaSyAS195NxI6fi6GWqLR2OfZeR0rQ2jcE-So";
  public items: any = [];
  constructor(public http: HttpClient) {}

  nuevoUsuario(value) {}

  login(value) {
    return this.http.post(`${Uris.Login}`, value);
  }
  GetAllReportType() {
    return this.http.get(`${Uris.reportType}`);
  }
  Report(value) {
    return this.http.post(`${Uris.Report}`, value);
  }
  GetReportID(value) {
    return this.http.get(`${Uris.Report}${value}`);
  }
  GetReport() {
    return this.http.get(`${Uris.Report}`);
  }
  User(value) {
    return this.http.post(`${Uris.User}`, value);
  }
  filterItems(searchTerm) {
    return this.items.filter((item) => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
