import { BehaviorSubject, Observable } from 'rxjs';
import { Company } from '../../../models/ICompanies';
import {
  Contact,
  SkillGroup,
  Reference,
  Education,
  ContactType,
} from '../../../models/IPersonalData';

export abstract class AlphaComponentBase {
  contactsSubject$: BehaviorSubject<Contact[]>;
  skillsSubject$: BehaviorSubject<SkillGroup[]>;
  referencesSubject$: BehaviorSubject<Reference[]>;
  educationsSubject$: BehaviorSubject<Education[]>;
  firstNameSubject$: BehaviorSubject<string>;
  lastNameSubject$: BehaviorSubject<string>;
  githubProfileSubject$: BehaviorSubject<string>;
  locationSubject$: BehaviorSubject<string>;
  jobTitleSubject$: BehaviorSubject<string>;
  companiesSubject$: BehaviorSubject<Company[]>;
  profileSummarySubject$: BehaviorSubject<string>;
  constructor() {
    this.contactsSubject$ = new BehaviorSubject<Contact[]>([]);
    this.skillsSubject$ = new BehaviorSubject<SkillGroup[]>([]);
    this.referencesSubject$ = new BehaviorSubject<Reference[]>([]);
    this.educationsSubject$ = new BehaviorSubject<Education[]>([]);
    this.firstNameSubject$ = new BehaviorSubject<string>('');
    this.lastNameSubject$ = new BehaviorSubject<string>('');
    this.githubProfileSubject$ = new BehaviorSubject<string>('');
    this.locationSubject$ = new BehaviorSubject<string>('');
    this.jobTitleSubject$ = new BehaviorSubject<string>('');
    this.companiesSubject$ = new BehaviorSubject<Company[]>([]);
    this.profileSummarySubject$ = new BehaviorSubject<string>('');
  }

  get contacts(): Contact[] {
    return this.contactsSubject$.value;
  }

  get email(): string | undefined {
    return this.contacts
      .filter((c) => c.type.toString() === ContactType[ContactType.email])
      .find((c) => c)?.data;
  }

  get emailHref(): string {
    return `mailto:${this.email}`;
  }

  get mobile(): string | undefined {
    return this.contacts
      .filter((c) => c.type.toString() === ContactType[ContactType.mobile])
      .find((c) => c)?.data;
  }

  get skills(): SkillGroup[] {
    return this.skillsSubject$.getValue();
  }

  get skills$(): Observable<SkillGroup[]> {
    return this.skillsSubject$.asObservable();
  }

  get references(): Reference[] {
    return this.referencesSubject$.getValue();
  }

  get educations(): Education[] {
    return this.educationsSubject$.getValue();
  }

  get fullName(): string {
    return `${this.firstNameSubject$.value} ${this.lastNameSubject$.value}`;
  }

  get jobTitle(): string {
    return this.jobTitleSubject$.getValue();
  }

  get githubProfileUrl(): string {
    return this.githubProfileSubject$.getValue();
  }

  get location(): string {
    return this.locationSubject$.getValue();
  }

  get profileSummary(): string {
    return this.profileSummarySubject$.getValue();
  }

  get companies(): Company[] {
    return this.companiesSubject$.getValue();
  }

  get companies$(): Observable<Company[]> {
    return this.companiesSubject$.asObservable();
  }
}
