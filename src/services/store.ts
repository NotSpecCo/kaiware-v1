import { StoreApp } from '../models/StoreApp';
import { StoreCategory } from '../models/StoreCategory';
import { getStorageItem, setStorageItem, StorageKey } from '../utils/storage';

type StoreDb = {
  categories: StoreCategory[];
  apps: StoreApp[];
  fetchedAt: number;
  generatedAt: number;
};

export async function getStoreDb(forceRefresh = false): Promise<StoreDb> {
  let store = getStorageItem<StoreDb>(StorageKey.StoreDb);
  if (!store || new Date().valueOf() - store.fetchedAt > 600000 || forceRefresh) {
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

export async function getCategories(): Promise<StoreCategory[]> {
  const store = await getStoreDb();
  return store.categories;
}

export async function getAppsByCategory(categoryId: string): Promise<{
  category: StoreCategory;
  apps: StoreApp[];
  fetchedAt: number;
}> {
  const store = await getStoreDb();
  const category: StoreCategory = store.categories.find((a) => a.id === categoryId);
  const apps: StoreApp[] = store.apps.filter((a) =>
    a.meta.categories.includes(categoryId)
  ) as StoreApp[];
  return Promise.resolve({ category, apps, fetchedAt: store.fetchedAt });
}
