import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { Observable, Subscription, map, switchMap, tap } from "rxjs";
import { IPersonalData } from "../models/IPersonalData";
import { Company } from "../models/ICompanies";
import { AlphaComponentBase } from "./base/alpha.component.base";

@Component({
  selector: "app-alpha",
  templateUrl: "./alpha.component.html",
  styleUrls: ["./alpha.component.scss"],
})
export class AlphaComponent extends AlphaComponentBase implements OnInit, OnDestroy {
  private subscriptions: Subscription;
  constructor(public dataService: DataService) {
    super();
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.formData$.subscribe());
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get getPersonalData$() {
    return this.dataService.getPersonalData();
  }

  get getExperienceData$(): Observable<Company[]> {
    return this.dataService.getExperienceData()
  }

  get personalData$(): Observable<IPersonalData> {
    return this.getPersonalData$.pipe(
      tap((p) => {
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
      })
    );
  }

  get experienceData$(): Observable<Company[]> {
    return this.getExperienceData$.pipe(
      map((c: any) => {
        return c.companies;
      }),
      tap((companies) => {
        console.log(companies);
        this.companiesSubject$.next(companies);
      })
    );
  }

  get formData$() {
    return this.personalData$.pipe(
      switchMap(() => {
        return this.experienceData$;
      })
    );
  }
}
