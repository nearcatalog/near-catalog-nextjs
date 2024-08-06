export type ProjectId = string;

export type ProjectProfile = {
  name: string;
  tagline: string;
  description: string;
  image: {
    url: string;
  };
  dapp: string;
  linktree: {
    website: string;
    github: string;
    twitter: string;
    medium: string;
    discord: string;
    telegram: string;
  };
  lnc: {
    slug: string;
    score: number;
  };
  tags: Record<string, string>;
  tokens: any;
};

export type ProjectRecord = {
  slug: ProjectId;
  profile: ProjectProfile;
};

export type ProjectCategory = {
  cat_title: string;
  cat_description: string;
  cat_slug: string;
  data: Record<ProjectId, ProjectRecord>;
};
