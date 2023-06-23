import { BehaviorSubject, Observable } from "rxjs";
import {
  Contact,
  Skill,
  Reference,
  Education,
} from "../../models/IPersonalData";
import { Company } from "src/app/models/ICompanies";

export abstract class AlphaComponentBase {
  first: number = 0;
  contactsSubject$: BehaviorSubject<Contact[]>;
  skillsSubject$: BehaviorSubject<Skill[]>;
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
    this.skillsSubject$ = new BehaviorSubject<Skill[]>([]);
    this.referencesSubject$ = new BehaviorSubject<Reference[]>([]);
    this.educationsSubject$ = new BehaviorSubject<Education[]>([]);
    this.firstNameSubject$ = new BehaviorSubject<string>("");
    this.lastNameSubject$ = new BehaviorSubject<string>("");
    this.githubProfileSubject$ = new BehaviorSubject<string>("");
    this.locationSubject$ = new BehaviorSubject<string>("");
    this.jobTitleSubject$ = new BehaviorSubject<string>("");
    this.companiesSubject$ = new BehaviorSubject<Company[]>([]);
    this.profileSummarySubject$ = new BehaviorSubject<string>("");
  }

  get contacts(): Contact[] {
    return this.contactsSubject$.value;
  }

  get email(): string {
    return this.contacts.filter((c) => c.type === "email").map((c) => c.id)[
      this.first
    ];
  }

  get emailHref(): string {
    return `mailto:${this.email}`;
  }

  get mobile(): string {
    return this.contacts.filter((c) => c.type === "mobile").map((c) => c.id)[
      this.first
    ];
  }

  get skills(): Skill[] {
    return this.skillsSubject$.value;
  }

  get skills$(): Observable<Skill[]> {
    return this.skillsSubject$.asObservable();
  }

  get references(): Reference[] {
    return this.referencesSubject$.value;
  }

  get educations(): Education[] {
    return this.educationsSubject$.value;
  }

  get fullName(): string {
    return `${this.firstNameSubject$.value} ${this.lastNameSubject$.value}`;
  }

  get jobTitle(): string {
    return this.jobTitleSubject$.value;
  }

  get githubProfileUrl(): string {
    return this.githubProfileSubject$.value;
  }

  get location(): string {
    return this.locationSubject$.value;
  }

  get profileSummary(): string {
    return this.profileSummarySubject$.value;
  }

  get companies(): Company[] {
    return this.companiesSubject$.value;
  }

  get companies$(): Observable<Company[]> {
    return this.companiesSubject$.asObservable();
  }
}
