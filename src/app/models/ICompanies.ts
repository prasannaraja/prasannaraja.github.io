export interface Company {
  name: string;
  website: string;
  position: string;
  summary: Summary;
}

export interface Summary {
  company: Company2;
  work: Work;
}

export interface Company2 {
  details: string;
}

export interface Work {
  details: string;
  email: string;
  manager: Manager;
  hr: Hr;
  employeeId: string;
  contact: string;
  teamSize: number;
  location: any;
  projects: Project[];
  responsibilities: string[];
  skills: string[];
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
