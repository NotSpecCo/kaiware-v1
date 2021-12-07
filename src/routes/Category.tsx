import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { AppRow } from '../components/AppRow';
import { StoreApp, StoreCategory } from '../models';
import { getAppsByCategory } from '../services/store';
import { IconButton } from '../ui-components/IconButton';
import { IconSize } from '../ui-components/SvgIcon';
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
  const history = useHistory();

  useEffect(() => {
    getApps();
  }, [categoryId]);

  async function getApps(forceRefresh = false) {
    await getAppsByCategory(categoryId, { forceRefresh }).then(setData);
  }

  return (
    <View>
      <ViewHeader>
        <Typography type="titleLarge" padding="none">
          Apps {'>'} {data?.category.name}
        </Typography>
      </ViewHeader>
      <ViewContent>
        {data?.apps.map((app) => (
          <AppRow
            key={app.slug}
            appId={app.slug}
            iconUrl={app.icon}
            name={app.name}
            author={app.author?.[0]}
            description={app.description}
            downloadUrl={app.download.url}
            onClick={() => history.push(`/app/${app.slug}`)}
          />
        ))}
      </ViewContent>
      <ViewFooter className={styles.footer}>
        {data === undefined ? 'Loading...' : `Updated ${format(data.fetchedAt, 'MMMM do p')}`}
        <IconButton
          className={styles.btnRefresh}
          icon="refresh"
          animation="spin"
          size={IconSize.Small}
          onClick={() => getApps(true)}
        />
      </ViewFooter>
    </View>
  );
}
