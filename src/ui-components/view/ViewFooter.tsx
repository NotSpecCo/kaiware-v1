import React from 'react';
import { ComponentBaseProps } from '../../models';
import { joinClasses } from '../../utils/classes';
import styles from './ViewFooter.module.css';

type Props = ComponentBaseProps;

export function ViewFooter(props: Props): JSX.Element {
  return <div className={joinClasses(styles.root, props.className)}>{props.children}</div>;
}
