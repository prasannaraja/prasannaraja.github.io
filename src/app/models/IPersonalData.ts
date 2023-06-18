export interface IPersonalData {
  name: string;
  contact: Contact[];
  github: string;
  location: string;
  jobTitle: string;
  skills: Skills[];
  educations: Education[];
  reference: Reference[];
}

export interface Contact {
  id: string;
  type: string;
}

export interface Skills {
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
