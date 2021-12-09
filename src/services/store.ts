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
    const data = await (await fetch('https://banana-hackers.gitlab.io/store-db/data.json')).json();
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
