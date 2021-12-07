export type ClickableProps = {
  onClick?: (ev: React.MouseEvent<any, MouseEvent>) => Promise<void> | void;
};
