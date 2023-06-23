import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { Observable, map, switchMap } from "rxjs";
import { IPersonalData } from "../models/IPersonalData";
import { Company } from "../models/ICompanies";
import { AlphaComponentBase } from "./base/alpha.component.base";

@Component({
  selector: "app-alpha",
  providers: [DataService],
  templateUrl: "./alpha.component.html",
  styleUrls: ["./alpha.component.scss"],
})
export class AlphaComponent extends AlphaComponentBase implements OnInit {
  constructor(public dataService: DataService) {
    super();
  }

  get personalData$(): Observable<IPersonalData> {
    return this.dataService.getPersonalData().pipe(
      map((p) => {
        this.contactsSubject$.next(p.contacts);
        this.skillsSubject$.next(p.skills);
        this.referencesSubject$.next(p.references);
        this.educationsSubject$.next(p.educations);
        this.firstNameSubject$.next(p.firstName);
        this.lastNameSubject$.next(p.lastName);
        this.jobTitleSubject$.next(p.jobTitle);
        this.locationSubject$.next(p.location);
        this.githubProfileSubject$.next(p.githubProfile);
        this.profileSummarySubject$.next(p.profileSummary);
        return p;
      })
    );
  }

  get experienceData$(): Observable<Company[]> {
    return this.dataService.getExperienceData().pipe(
      map((c: any) => {
        this.companiesSubject$.next(c.companies);
        return c.companies;
      })
    );
  }

  get getData$() {
    return this.personalData$.pipe(
      switchMap(() => {
        return this.experienceData$;
      })
    );
  }

  toObject(obj: string): any {
    return JSON.parse(obj);
  }

  ngOnInit(): void {
    this.getData$.subscribe();
  }
}
