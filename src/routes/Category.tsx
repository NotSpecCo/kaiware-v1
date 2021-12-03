import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { StoreApp } from '../models/StoreApp';
import { StoreCategory } from '../models/StoreCategory';
import { getAppsByCategory, getCategories } from '../services/storedb';
import { AppRow } from '../ui-components/AppRow';
import styles from './Category.module.css';

type Params = {
  categoryId: string;
};
export function Category(): JSX.Element {
  const [apps, setApps] = useState<StoreApp[]>([]);
  const [category, setCategory] = useState<StoreCategory>();
  console.log('apps', apps);

  const { categoryId } = useParams<Params>();

  useEffect(() => {
    console.log('category', categoryId);
    getCategories().then((res) => setCategory(res.find((a) => a.id === categoryId)));
    getAppsByCategory(categoryId).then(setApps);
  }, [categoryId]);

  return (
    <div className={styles.root}>
      <header>
        <h1>{category?.name}</h1>
      </header>
      <section className={styles.content}>
        {apps.map((app) => (
          <AppRow key={app.slug} app={app} onClick={() => console.log('clicked', app)} />
        ))}
      </section>
      <footer>Updated {format(new Date(), 'MMMM do p')}</footer>
    </div>
  );
}
