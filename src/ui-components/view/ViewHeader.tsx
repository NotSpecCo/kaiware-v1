import React from 'react';
import { ComponentBaseProps } from '../../models';
import { joinClasses } from '../../utils/classes';
import styles from './ViewHeader.module.css';

type Props = ComponentBaseProps;

export function ViewHeader(props: Props): JSX.Element {
  return <div className={joinClasses(styles.root, props.className)}>{props.children}</div>;
}
