import React, { useEffect, useRef, useState } from 'react';
import { ComponentBaseProps } from '../models';
import { joinClasses } from '../utils/classes';
import styles from './ImageScroller.module.css';

type Props = ComponentBaseProps & {
  imageUrls: string[];
};

export function ImageScroller(props: Props): JSX.Element {
  const [progress, setProgress] = useState<'start' | 'middle' | 'end'>('start');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (ev: Event) => {
      const element = ev.target as HTMLDivElement;
      if (element.scrollLeft === 0) {
        setProgress('start');
      } else if (element.scrollLeft + element.clientWidth === element.scrollWidth) {
        setProgress('end');
      } else {
        setProgress('middle');
      }
    };

    ref.current?.addEventListener('scroll', handleScroll, { passive: true });

    return () => ref.current?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={joinClasses(styles.root, props.className)}>
      {progress !== 'start' && <div className={styles.fadeLeft}></div>}
      <div className={styles.scroller} ref={ref}>
        {props.imageUrls.map((a, i) => (
          <img key={i} src={a} alt="" />
        ))}
      </div>
      {progress !== 'end' && <div className={styles.fadeRight}></div>}
    </div>
  );
}
