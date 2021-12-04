import React from 'react';
import { ComponentBaseProps } from '../models';
import { ClickableProps } from '../models/ClickableProps';
import { ifClass, joinClasses } from '../utils/classes';
import styles from './Button.module.css';

type Props = ComponentBaseProps &
  ClickableProps & {
    text: string;
    disabled?: boolean;
    fullWidth?: boolean;
  };

export function Button(props: Props): JSX.Element {
  return (
    <button
      className={joinClasses(
        styles.root,
        ifClass(props.fullWidth, styles.fullWidth),
        props.className
      )}
      disabled={props.disabled}
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
