import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IPersonalData } from "../models/IPersonalData";
import { Company } from "../models/ICompanies";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getPersonalData(): Observable<IPersonalData> {
    return this.http.get<IPersonalData>("assets/personal.data.json");
  }

  public getExperienceData(): Observable<Company[]> {
    return this.http.get<Company[]>("assets/experience.data.json");
  }
}
