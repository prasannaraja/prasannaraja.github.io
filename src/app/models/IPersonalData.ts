export interface IPersonalData {
  name: string;
  contact: Contact[];
  github: string;
  location: string;
  jobTitle: string;
  skills: Skills;
  educations: Education[];
  reference: Reference[];
}

export interface Contact {
  id: string;
  type: string;
}

export interface Skills {
  language: Language;
  framework: Framework;
  databases: Databases;
  VersionControl: VersionControl;
  Tools: Tools;
  Testing: Testing;
}

export interface Language {
  title: string;
  data: Info[];
}

export interface Info {
  name: string;
  type: string;
}

export interface Framework {
  title: string;
  data: Info[];
}

export interface Databases {
  title: string;
  data: Info[];
}

export interface VersionControl {
  title: string;
  data: Info[];
}

export interface Tools {
  title: string;
  data: Info[];
}

export interface Testing {
  title: string;
  data: Info[];
}

export interface Education {
  university: string;
  program: string;
  latest: boolean;
  type: string;
}

export interface Reference {
  firstName: string;
  lastName: string;
  designation: string;
  mobile: string;
  email: string;
  type: string;
}
