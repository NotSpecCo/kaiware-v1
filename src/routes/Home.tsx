import React from 'react';
import { Typography } from '../ui-components/Typography';
import { View, ViewContent, ViewHeader } from '../ui-components/view';

export function Home(): JSX.Element {
  return (
    <View>
      <ViewHeader>
        <Typography type="titleLarge" padding="none">
          Home
        </Typography>
      </ViewHeader>
      <ViewContent>Home view</ViewContent>
    </View>
  );
}
