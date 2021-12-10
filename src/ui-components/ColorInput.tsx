import React from 'react';
import { ComponentBaseProps } from '../models';
import styles from './ColorInput.module.css';

type Props = ComponentBaseProps & {
  value: string;
  onChange: (val: string) => void;
};

export function ColorInput(props: Props): JSX.Element {
  return (
    <div className={styles.root}>
      <input
        type="color"
        className={styles.previewInput}
        value={new RegExp(/#[0-9a-fA-F]{6}/).test(props.value) ? props.value : '#000000'} // It complains if the value isn't hex
        onChange={(ev) => props.onChange(ev.target.value)}
      ></input>
      <div className={styles.preview} style={{ backgroundColor: props.value }}></div>
    </div>
  );
}
