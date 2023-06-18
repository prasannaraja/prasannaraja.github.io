import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IPersonalData } from "../models/IPersonalData";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getPersonalData(): Observable<IPersonalData> {
    return this.http.get<IPersonalData>("assets/personal.data.json");
  }
}
