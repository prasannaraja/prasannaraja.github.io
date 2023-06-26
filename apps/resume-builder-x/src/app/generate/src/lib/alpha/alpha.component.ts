import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { AlphaComponentBase } from './base/alpha.component.base';
import { ICompanies, IPersonalData } from '../../models';
import { DataService } from '../../services';

@Component({
  selector: 'rbx-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.scss'],
})
export class AlphaComponent
  extends AlphaComponentBase
  implements OnInit, OnDestroy
{
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

  get getExperienceData$(): Observable<ICompanies> {
    return this.dataService.getExperienceData();
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

  get experienceData$(): Observable<ICompanies> {
    return this.getExperienceData$.pipe(
      tap((companies: ICompanies) => {
        this.companiesSubject$.next(companies.data);
      })
    );
  }

  get formData$(): Observable<ICompanies> {
    return this.personalData$.pipe(
      switchMap(() => {
        return this.experienceData$;
      })
    );
  }
}
