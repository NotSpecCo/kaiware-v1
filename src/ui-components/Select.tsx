import React from 'react';
import { ComponentBaseProps } from '../models';
import styles from './Select.module.css';

type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = ComponentBaseProps & {
  value: T;
  options: Option<T>[];
  onChange: (val: T) => void | any;
};

export function Select<T extends string>(props: Props<T>): JSX.Element {
  return (
    <select
      className={styles.root}
      value={props.value}
      onChange={(ev) => props.onChange?.(ev.target.value as T)}
    >
      {props.options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
