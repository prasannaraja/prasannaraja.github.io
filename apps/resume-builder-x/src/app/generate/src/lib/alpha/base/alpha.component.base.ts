import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import {
    Contact,
    SkillGroup,
    Reference,
    Education,
    ContactType,
} from '../../../models/IPersonalData';
import { Company, Project } from '../../../models/IExperience';

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
            .filter(
                (c) => c.type.toString() === ContactType[ContactType.mobile]
            )
            .find((c) => c)?.data;
    }

    get skills(): SkillGroup[] {
        return this.skillsSubject$.value;
    }

    get skills$(): Observable<SkillGroup[]> {
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

    get projects$(): Observable<Project[]> {
        return this.companiesSubject$.pipe(
            map((companies) => {
                return companies.map((company) => {
                    company.summary.work.projects.map((project) => {
                        project.role = company.position;
                        return project;
                    });
                    return company;
                });
            }),
            map((companies) => {
                return companies.flatMap(
                    (company) => company.summary.work.projects
                );
            })
        );
    }
}
