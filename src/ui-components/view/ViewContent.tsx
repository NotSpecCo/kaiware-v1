import React from 'react';
import { ComponentBaseProps } from '../../models';
import { joinClasses } from '../../utils/classes';
import styles from './ViewContent.module.css';

type Props = ComponentBaseProps;

export function ViewContent(props: Props): JSX.Element {
  return <div className={joinClasses(styles.root, props.className)}>{props.children}</div>;
}
