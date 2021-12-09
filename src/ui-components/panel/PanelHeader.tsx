import React from 'react';
import { ComponentBaseProps } from '../../models';
import { joinClasses } from '../../utils/classes';
import { IconButton } from '../IconButton';
import { Typography } from '../Typography';
import styles from './PanelHeader.module.css';

type Props = ComponentBaseProps & {
  title: string;
  imageUrl?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
};

export function PanelHeader({ showCloseButton = true, ...props }: Props): JSX.Element {
  return (
    <div className={joinClasses(styles.root, props.className)}>
      <div className={styles.title}>
        {props.imageUrl ? <img src={props.imageUrl} /> : null}
        <Typography type="titleLarge" padding="none">
          {props.title}
        </Typography>
        <div className={styles.spacer}></div>
        {showCloseButton && <IconButton icon="cancel" onClick={props.onClose} />}
      </div>
      {props.children}
    </div>
  );
}
