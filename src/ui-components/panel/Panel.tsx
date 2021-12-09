import React, { useEffect, useState } from 'react';
import { ComponentBaseProps } from '../../models';
import { ifClass, joinClasses } from '../../utils/classes';
import styles from './Panel.module.css';

type Props = ComponentBaseProps & {
  panelId: string;
};

export function Panel(props: Props): JSX.Element {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className={joinClasses(styles.root, ifClass(show, styles.show), props.className)}>
      <div className={styles.titlebar} />
      {props.children}
    </div>
  );
}
