import React from 'react';
import { ComponentBaseProps } from '../../models';
import { joinClasses } from '../../utils/classes';
import styles from './View.module.css';

type Props = ComponentBaseProps;

export function View(props: Props): JSX.Element {
  const cols = Array.isArray(props.children)
    ? (props.children as any[]).filter(Boolean).map((child, i, arr) => {
        if (i === arr.length - 1) {
          return 'auto';
        } else if (i === arr.length - 2) {
          return '350px';
        } else {
          return '40px';
        }
      })
    : ['auto'];

  return (
    <div
      className={joinClasses(styles.root, props.className)}
      style={{ gridTemplateColumns: cols.join(' ') }}
    >
      {props.children}
    </div>
  );
}
