export interface User {
  id: string;
  login: string;

  avatarUrl?: string;
  bio?: string;
  company?: string;
  email?: string;
  location?: string;
  name?: string;
  twitterUsername?: string;
  url?: string;
  status?: { message: string; };

  followers?: { totalCount: number };
  following?: { totalCount: number };
  starredRepositories?: { totalCount: number; };
  organizations?: {
    totalCount: number;
    ids: string[];
  }
  websiteUrl?: string;
  pinnedItems?: {
    totalCount: number;
    ids: string[];
  }
  pinnableItems?: {
    totalCount: number;
    ids: string[]
  }
}

interface Organization {
  id: string;
}

interface Repository {
  id: string;
}
