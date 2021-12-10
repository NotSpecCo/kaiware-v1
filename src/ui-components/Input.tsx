import React from 'react';
import { ComponentBaseProps } from '../models';
import styles from './Input.module.css';

type Props = ComponentBaseProps & {
  value: string;
  onInput: (val: string) => void;
};

export function Input(props: Props): JSX.Element {
  return (
    <input
      type="text"
      className={styles.root}
      value={props.value}
      onInput={(ev) => props.onInput((ev.target as HTMLInputElement).value)}
    ></input>
  );
}
