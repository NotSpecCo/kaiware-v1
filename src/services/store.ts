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

export async function getStoreDb(options?: Options): Promise<StoreDb> {
  let store = getStorageItem<StoreDb>(StorageKey.StoreDb);
  if (!store || new Date().valueOf() - store.fetchedAt > 1_800_000 || options?.forceRefresh) {
    store = await fetch('https://banana-hackers.gitlab.io/store-db/data.json')
      .then((res) => res.json())
      .then((res) => {
        const categories: StoreCategory[] = Object.keys(res.categories).map((key) => ({
          ...(res.categories as unknown as { [key: string]: Omit<StoreCategory, 'id'> })[key],
          id: key,
        }));

        return {
          categories,
          apps: res.apps,
          fetchedAt: new Date().valueOf(),
          generatedAt: res.generated_at,
        };
      });
    setStorageItem(StorageKey.StoreDb, store);
  }

  return store;
}

export async function getCategories(options?: Options): Promise<StoreCategory[]> {
  const store = await getStoreDb(options);
  return store.categories;
}

export async function getAppsByCategory(
  categoryId: string,
  options?: Options
): Promise<{
  category: StoreCategory;
  apps: StoreApp[];
  fetchedAt: number;
}> {
  const store = await getStoreDb(options);
  const category: StoreCategory = store.categories.find((a) => a.id === categoryId);
  const apps: StoreApp[] = store.apps.filter((a) =>
    a.meta.categories.includes(categoryId)
  ) as StoreApp[];
  return Promise.resolve({ category, apps, fetchedAt: store.fetchedAt });
}

export async function getAppBySlug(slug: string, options?: Options): Promise<StoreApp> {
  const store = await getStoreDb(options);
  const app: StoreApp = store.apps.find((a) => a.slug === slug);
  return app;
}
