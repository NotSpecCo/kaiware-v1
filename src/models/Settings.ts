export enum Theme {
  Light = 'light',
  Warm = 'warm',
  Blue = 'blue',
  Dark = 'dark',
  Darker = 'darker',
  Darkest = 'darkest',
}

export enum TextSize {
  Smallest = 'smallest',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Largest = 'largest',
}

export type Settings = {
  theme: Theme;
  textSize: TextSize;
};
