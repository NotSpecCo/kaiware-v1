export type StoreApp = {
  name: string;
  description: string;
  icon: string;
  screenshots: string[];
  license: string;
  website: string;
  git_repo: string;
  download: {
    url: string;
    manifest: string;
  };
  author: string[];
  maintainer: string[];
  has_tracking: boolean;
  has_ads: boolean;
  donation: string;
  meta: {
    tags: string;
    categories: string[];
  };
  type: string;
  slug: string;
};
