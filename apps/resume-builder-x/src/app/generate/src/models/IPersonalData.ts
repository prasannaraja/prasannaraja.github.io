export interface IPersonalData {
    firstName: string;
    lastName: string;
    contacts: Contact[];
    githubProfile: string;
    profileSummary: string;
    location: string;
    jobTitle: string;
    skills: SkillGroup[];
    educations: Education[];
    references: Reference[];
}

export interface Contact {
    id: string;
    type: ContactType;
    data: string;
}

export interface SkillGroup {
    id: string;
    title: string;
    type: RequiredType;
    data: Skill[];
}

export interface Skill {
    id: string;
    name: string;
    type: RequiredType;
}

export interface Education {
    id: string;
    university: string;
    program: string;
    latest: boolean;
    type: RequiredType;
}

export interface Reference {
    id: string;
    firstName: string;
    lastName: string;
    designation: string;
    mobile: string;
    email: string;
    type: RequiredType;
}

export enum ContactType {
    mobile,
    email,
    teams,
}

export enum RequiredType {
    mandatory,
    standard,
    optional,
}
