import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IPersonalData } from "../models/IPersonalData";
import { ICompanies } from "../models/ICompanies";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) { }

  public getPersonalData(): Observable<IPersonalData> {
    return this.http.get<IPersonalData>("assets/sample.personal.data.json");
  }

  public getExperienceData(): Observable<ICompanies> {
    return this.http.get<ICompanies>("assets/sample.experience.data.json");
  }
}
