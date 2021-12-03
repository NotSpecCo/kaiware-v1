import React from 'react';
import { ClickableProps } from '../models/ClickableProps';
import styles from './Button.module.css';

type Props = ClickableProps & {
  text: string;
};

export function Button(props: Props): JSX.Element {
  return (
    <button
      className={styles.root}
      onClick={(ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        props.onClick?.(ev);
      }}
    >
      {props.text}
    </button>
  );
}
