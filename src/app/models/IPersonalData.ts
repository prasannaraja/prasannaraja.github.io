export interface IPersonalData {
  firstName: string;
  lastName: string;
  contacts: Contact[];
  githubProfile: string;
  profileSummary: string;
  location: string;
  jobTitle: string;
  skills: Skill[];
  educations: Education[];
  references: Reference[];
}

export interface Contact {
  id: string;
  type: string;
}

export interface Skill {
  title: string;
  type: string;
  data: {
    name: string;
    type: string;
  };
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
