import React from 'react';
import { ComponentBaseProps } from '../../models';
import { joinClasses } from '../../utils/classes';
import styles from './PanelFooter.module.css';

type Props = ComponentBaseProps;

export function PanelFooter(props: Props): JSX.Element {
  return <div className={joinClasses(styles.root, props.className)}>{props.children}</div>;
}
