import { StoreApp } from './StoreApp';
import { StoreCategory } from './StoreCategory';

export type StoreDb = {
  version: number;
  generated_at: number;
  categories: { [key: string]: Omit<StoreCategory, 'id'> };
  apps: StoreApp[];
};
