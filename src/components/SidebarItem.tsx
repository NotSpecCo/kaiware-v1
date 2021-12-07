import React from 'react';
import { ComponentBaseProps } from '../models';
import { ClickableProps } from '../models/ClickableProps';
import styles from './SidebarItem.module.css';

type Props = ComponentBaseProps &
  ClickableProps & {
    icon?: string;
    primaryText: string;
    secondaryText?: string;
  };

export function SidebarItem(props: Props): JSX.Element {
  return (
    <div className={styles.root} onClick={props.onClick}>
      {props.icon ? <i className={props.icon}></i> : null}
      <div className={styles.text}>
        <div className={styles.primaryText}>{props.primaryText}</div>
        <div className={styles.secondaryText}>{props.secondaryText}</div>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
