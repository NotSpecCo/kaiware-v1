import lunr from 'lunr';
import { StoreApp } from '../models/StoreApp';
import { StoreCategory } from '../models/StoreCategory';
import { getStorageItem, setStorageItem, StorageKey } from '../utils/storage';

type StoreDb = {
  categories: StoreCategory[];
  apps: StoreApp[];
  fetchedAt: number;
  generatedAt: number;
};

type Options = {
  forceRefresh?: boolean;
};

let searchIndex: lunr.Index;

function createSearchIndex(store: StoreDb) {
  searchIndex = lunr(function () {
    this.field('title');
    this.field('author');
    this.field('description');

    store.apps.forEach((app) => {
      this.add({
        title: app.name,
        description: app.description,
        author: app.author,
        id: app.slug,
      });
    });
  });
}

export async function getStoreDb(options?: Options): Promise<StoreDb> {
  let store = getStorageItem<StoreDb>(StorageKey.StoreDb);
  if (!store || new Date().valueOf() - store.fetchedAt > 1_800_000 || options?.forceRefresh) {
    const data = await fetch('https://banana-hackers.gitlab.io/store-db/data.json')
      .then((res) => res.json())
      .then((res) => {
        res.apps = res.apps.map((a: any) => {
          const people = [
            ...a.author.map((person: string) => {
              const emailMatch = person.match(/(.*)[ ]?<(.*@.*)>/);
              const urlMatch = person.match(/(.*)[ ]?<(http.*)>/);
              return {
                name: emailMatch?.[1] || urlMatch?.[1] || person,
                email: emailMatch?.[2] || undefined,
                website: urlMatch?.[2] || undefined,
                role: 'author',
              };
            }),
            ...a.maintainer.map((person: string) => {
              const emailMatch = person.match(/(.*)[ ]?<(.*@.*)>/);
              const urlMatch = person.match(/(.*)[ ]?<(http.*)>/);
              return {
                name: emailMatch?.[1] || urlMatch?.[1] || person,
                email: emailMatch?.[2] || undefined,
                website: urlMatch?.[2] || undefined,
                role: 'maintainer',
              };
            }),
          ];

          return {
            ...a,
            people,
          };
        });

        return res;
      });
    const categories: StoreCategory[] = Object.keys(data.categories).map((key) => ({
      ...(data.categories as unknown as { [key: string]: Omit<StoreCategory, 'id'> })[key],
      id: key,
    }));
    store = {
      categories,
      apps: data.apps,
      fetchedAt: new Date().valueOf(),
      generatedAt: data.generated_at,
    };
    setStorageItem(StorageKey.StoreDb, store);
    createSearchIndex(store);
  }

  if (!searchIndex) {
    createSearchIndex(store);
  }

  return store;
}

export async function getCategories(options?: Options): Promise<StoreCategory[]> {
  const store = await getStoreDb(options);
  return store.categories;
}

/**
 *
 * @returns apps for the specified category, null if not found
 */
export async function getAppsByCategory(
  categoryId: string,
  options?: Options
): Promise<{
  category: StoreCategory;
  apps: StoreApp[];
  fetchedAt: number;
}> {
  const store = await getStoreDb(options);
  const category = store.categories.find((a) => a.id === categoryId) || {
    id: 'unknown',
    name: 'Unknown',
  };
  const apps: StoreApp[] = store.apps.filter((a) =>
    a.meta.categories.includes(categoryId)
  ) as StoreApp[];
  return { category, apps, fetchedAt: store.fetchedAt };
}

/**
 *
 * @returns the store app or null if not found
 */
export async function getAppBySlug(slug: string, options?: Options): Promise<StoreApp | null> {
  const store = await getStoreDb(options);
  const app = store.apps.find((a) => a.slug === slug);
  return app || null;
}

export async function searchApps(query: string): Promise<StoreApp[]> {
  const store = await getStoreDb();
  const results = searchIndex.search(`${query}*`).slice(0, 30);
  const appMap = store.apps.reduce((acc, val) => {
    acc[val.slug] = val;
    return acc;
  }, {} as { [key: string]: StoreApp });

  return results.map((a) => appMap[a.ref]);
}

export async function fetchAppVersion(manifestUrl: string): Promise<string> {
  const res = await fetch(manifestUrl)
    .then((res) => res.json() as { version?: string })
    .catch((err) => {
      console.log('Failed to get app version', err);
      return null;
    });

  return res?.version || '';
}
