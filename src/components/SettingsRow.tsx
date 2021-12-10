import React from 'react';
import { ComponentBaseProps } from '../models';
import { Typography } from '../ui-components/Typography';
import styles from './SettingsRow.module.css';

type Props = ComponentBaseProps & {
  title: string;
  description?: string;
};

export function SettingsRow(props: Props): JSX.Element {
  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <Typography type="bodyLarge" padding="none">
          {props.title}
        </Typography>
        {props.description ? (
          <Typography type="body" padding="none" color="secondary">
            {props.description}
          </Typography>
        ) : null}
      </div>
      {props.children}
    </div>
  );
}
