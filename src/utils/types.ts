export type Repo = {
  name: string;
  url: string;
  stargazerCount: number;
  isFork: boolean;
  forkCount: number;
  languages: {
    nodes: {
      name: string;
    }[];
  };
  _language: string;
  description: string;
  openGraphImageUrl: string;
  repositoryTopics: {
    nodes: {
      topic: {
        name: string;
      };
    }[];
  };
  _topics: string[];
};

export type User = {
  name: string;
  bio: string;
  url: string;
  repositories: {
    nodes: Repo[];
  };
};

export type LangColor = {
  [key: string]: {
    color?: string;
  };
};
