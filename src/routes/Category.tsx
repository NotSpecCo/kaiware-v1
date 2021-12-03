import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AppRow } from '../components/AppRow';
import { StoreApp } from '../models/StoreApp';
import { StoreCategory } from '../models/StoreCategory';
import { getAppsByCategory, getCategories } from '../services/storedb';
import { View, ViewContent, ViewFooter, ViewHeader } from '../ui-components/view';

type Params = {
  categoryId: string;
};
export function Category(): JSX.Element {
  const [apps, setApps] = useState<StoreApp[]>([]);
  const [category, setCategory] = useState<StoreCategory>();

  const { categoryId } = useParams<Params>();

  useEffect(() => {
    console.log('category', categoryId);
    getCategories().then((res) => setCategory(res.find((a) => a.id === categoryId)));
    getAppsByCategory(categoryId).then(setApps);
  }, [categoryId]);

  return (
    <View>
      <ViewHeader>
        <h1>{category?.name}</h1>
      </ViewHeader>
      <ViewContent>
        {apps.map((app) => (
          <AppRow key={app.slug} app={app} onClick={() => console.log('clicked', app)} />
        ))}
      </ViewContent>
      <ViewFooter>Updated {format(new Date(), 'MMMM do p')}</ViewFooter>
    </View>
  );
}
