import React, { useState } from 'react';
import { ComponentBaseProps } from '../models';
import { ClickableProps } from '../models/ClickableProps';
import { joinClasses } from '../utils/classes';
import styles from './IconButton.module.css';
import { IconName, IconSize, SvgIcon } from './SvgIcon';

type Props = ComponentBaseProps &
  ClickableProps & {
    icon: IconName;
    size?: IconSize;
    animation?: 'spin';
    disabled?: boolean;
  };

export function IconButton({ size = IconSize.Medium, ...props }: Props): JSX.Element {
  const [working, setWorking] = useState(false);

  async function handleClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.stopPropagation();
    ev.preventDefault();
    if (working) return;

    setWorking(true);
    try {
      await props.onClick?.(ev);
      setWorking(false);
    } catch (err) {
      setWorking(false);
    }
  }

  return (
    <button
      className={joinClasses(styles.root, props.className)}
      disabled={props.disabled || working}
      title={props.title}
      onClick={handleClick}
    >
      <SvgIcon
        className={props.animation === 'spin' && working ? styles.iconSpin : ''}
        icon={props.icon}
        size={size}
      />
    </button>
  );
}
