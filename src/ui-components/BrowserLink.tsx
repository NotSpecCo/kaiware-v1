import React from 'react';
import { ComponentBaseProps } from '../models';
import { openUrl } from '../services/browser';

type Props = ComponentBaseProps & {
  url: string;
  text: string;
};

export function BrowserLink(props: Props): JSX.Element {
  return (
    <a
      href=""
      onClick={(ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        openUrl(props.url);
      }}
    >
      {props.text}
    </a>
  );
}
