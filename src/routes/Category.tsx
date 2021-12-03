import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AppRow } from '../components/AppRow';
import { StoreApp, StoreCategory } from '../models';
import { getAppsByCategory } from '../services/store';
import { Typography } from '../ui-components/Typography';
import { View, ViewContent, ViewFooter, ViewHeader } from '../ui-components/view';
import styles from './Category.module.css';

type Params = {
  categoryId: string;
};
export function Category(): JSX.Element {
  const [data, setData] = useState<{
    category: StoreCategory;
    apps: StoreApp[];
    fetchedAt: number;
  }>();
  const { categoryId } = useParams<Params>();

  useEffect(() => {
    getAppsByCategory(categoryId).then(setData);
  }, [categoryId]);

  return (
    <View>
      <ViewHeader>
        <Typography type="titleLarge" padding="none">
          {data?.category.name}
        </Typography>
      </ViewHeader>
      <ViewContent>
        {data?.apps.map((app) => (
          <AppRow key={app.slug} app={app} onClick={() => console.log('clicked', app)} />
        ))}
      </ViewContent>
      <ViewFooter className={styles.footer}>
        {data === undefined ? 'Loading...' : `Updated ${format(data.fetchedAt, 'MMMM do p')}`}
      </ViewFooter>
    </View>
  );
}
