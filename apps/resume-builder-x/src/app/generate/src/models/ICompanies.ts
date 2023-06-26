import { RequiredType } from './IPersonalData';

export interface ICompanies {
    data: Company[];
}

export interface Company {
    name: string;
    website: string;
    position: string;
    summary: Summary;
}

export interface Summary {
    company: {
        details: string;
    };
    work: Work;
}

export interface Work {
    details: string;
    email: string;
    manager: Manager;
    hr: Hr;
    employeeId: string;
    contact: string;
    duration: string;
    teamSize: number;
    location: Location;
    projects: Project[];
    responsibilities: string[];
    skills: string[];
}

export interface Location {
    type: RequiredType;
    country: string;
    city: string;
}

export interface Manager {
    name: string;
    email: string;
    mobile: string;
    team: string;
}

export interface Hr {
    name: string;
    email: string;
    mobile: string;
}

export interface Project {
    title: string;
    client: string;
    website: string;
    shortSummary: string;
    summary: string;
    keywords: string[];
    responsibilities: string[];
    skills: string[];
    duration?: string;
}
