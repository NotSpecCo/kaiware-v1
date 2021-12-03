import React from 'react';
import { ComponentBaseProps } from '../../models';
import { joinClasses } from '../../utils/classes';
import styles from './View.module.css';

type Props = ComponentBaseProps;

export function View(props: Props): JSX.Element {
  return (
    <div className={joinClasses(styles.root, props.className)}>
      <div className={styles.titlebar} />
      {props.children}
    </div>
  );
}
