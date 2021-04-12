export interface Language {
  color: string;
  id: string;
  name: string;
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  languages: Language[];
  stargazerCount: number;
  forkCount: number;
  resourcePath: string;
}
