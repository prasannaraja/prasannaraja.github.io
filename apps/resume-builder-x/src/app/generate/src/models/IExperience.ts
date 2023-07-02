export interface IExperience {
    companies: Company[];
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
    present: boolean;
    duration: {
        start: {
            month: string;
            year: string;
        };
        end: {
            month: string;
            year: string;
        };
    };
    teamSize: number;
    location: Location;
    projects: Project[];
    responsibilities: string[];
    skills: string[];
}

export interface Location {
    type: DataType;
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
    role: string;
    website: string;
    shortSummary: string;
    summary: string;
    keywords: string[];
    responsibilities: string[];
    skills: string[];
    duration?: string;
}

enum DataType {
    mandatory,
    standard,
    optional,
}
