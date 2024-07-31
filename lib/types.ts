export type ProjectType = {
    slug: string;
    profile: {
        name: string;
        tagline: string;
        description: string;
        image: {
          url: string;
        };
        linktree: {
          website: string;
          github: string;
          twitter: string;
          medium: string;
          discord: string;
          telegram: string;
        };
        lnc?: {
          slug: string;
          score: number;
        };
        tags: Record<string, string>;
        tokens: any;
    };
  };