import { BehaviorSubject } from "rxjs";
import {
  Contact,
  Skill,
  Reference,
  Education,
} from "../../models/IPersonalData";
import { Company } from "src/app/models/ICompanies";

export abstract class AlphaComponentBase {
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
  }

  get contacts(): Contact[] {
    return this.contactsSubject$.value;
  }

  get skills(): Skill[] {
    return this.skillsSubject$.value;
  }

  get references(): Reference[] {
    return this.referencesSubject$.value;
  }

  get educations(): Education[] {
    return this.educationsSubject$.value;
  }

  get fullname(): string {
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

  get companies(): Company[] {
    return this.companiesSubject$.value;
  }
}
