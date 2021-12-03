import storedb from '../assets/storedb.json';
import { StoreApp } from '../models/StoreApp';
import { StoreCategory } from '../models/StoreCategory';

export function getCategories(): Promise<StoreCategory[]> {
  const categories: StoreCategory[] = Object.keys(storedb.categories).map((key) => ({
    ...(storedb.categories as unknown as { [key: string]: Omit<StoreCategory, 'id'> })[key],
    id: key,
  }));
  return Promise.resolve(categories);
}

export function getAppsByCategory(category: string): Promise<StoreApp[]> {
  const apps: StoreApp[] = storedb.apps.filter((a) =>
    a.meta.categories.includes(category)
  ) as StoreApp[];
  return Promise.resolve(apps);
}
