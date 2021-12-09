import React from 'react';
import { ComponentBaseProps } from '../../models';
import { joinClasses } from '../../utils/classes';
import styles from './PanelContent.module.css';

type Props = ComponentBaseProps;

export function PanelContent(props: Props): JSX.Element {
  return <div className={joinClasses(styles.root, props.className)}>{props.children}</div>;
}
