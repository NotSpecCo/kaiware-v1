import React from 'react';
import { ComponentBaseProps } from '../models';
import styles from './Select.module.css';

type Option = {
  value: string;
  label: string;
};

type Props = ComponentBaseProps & {
  value: string;
  options: Option[];
  onChange: (val: string) => void;
};

export function Select(props: Props): JSX.Element {
  return (
    <select
      className={styles.root}
      value={props.value}
      onChange={(ev) => props.onChange?.(ev.target.value)}
    >
      {props.options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
