import { Theme } from './models/Settings';

export type ThemeConfig = {
  id: Theme;
  values: {
    [key: string]: string;
    appBgColor: string;
    appAccentColor: string;
    primaryTextColor: string;
    secondaryTextColor: string;
    accentTextColor: string;
    dividerColor: string;
    highlightBgColor: string;
    sidebarBgColor: string;
    buttonBgColor: string;
    buttonTextColor: string;
    scrimColor: string;
  };
};

export const themes: ThemeConfig[] = [
  {
    id: Theme.Light,
    values: {
      appBgColor: 'hsl(0, 0%, 98%)',
      appAccentColor: '#000000',
      primaryTextColor: 'rgba(0, 0, 0, 0.88)',
      secondaryTextColor: 'rgba(0, 0, 0, 0.5)',
      accentTextColor: '#000000',
      dividerColor: 'rgba(0, 0, 0, 0.1)',
      highlightBgColor: 'rgba(0, 0, 0, 0.05)',
      sidebarBgColor: 'hsl(0, 0%, 100%)',
      buttonBgColor: '#000000',
      buttonTextColor: '#ffffff',
      scrimColor: 'rgba(255, 255, 255, .7)',
    },
  },
  {
    id: Theme.Warm,
    values: {
      appBgColor: 'hsl(54, 100%, 96%)',
      appAccentColor: '#000000',
      primaryTextColor: 'rgba(0, 0, 0, 0.88)',
      secondaryTextColor: 'rgba(0, 0, 0, 0.5)',
      accentTextColor: 'hsl(54, 100%, 35%)',
      dividerColor: 'rgba(0, 0, 0, 0.1)',
      highlightBgColor: 'rgba(0, 0, 0, 0.05)',
      sidebarBgColor: 'hsl(54, 100%, 97%)',
      buttonBgColor: 'hsl(54, 70%, 70%)',
      buttonTextColor: 'rgba(0, 0, 0, 0.88)',
      scrimColor: 'rgba(0, 0, 0, .7)',
    },
  },
  {
    id: Theme.Blue,
    values: {
      appBgColor: 'hsl(209, 20%, 30%)',
      appAccentColor: 'hsl(209, 20%, 75%)',
      primaryTextColor: 'rgba(255, 255, 255, 0.88)',
      secondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      accentTextColor: 'hsl(209, 20%, 75%)',
      dividerColor: 'rgba(255, 255, 255, 0.1)',
      highlightBgColor: 'rgba(255, 255, 255, 0.05)',
      sidebarBgColor: 'hsl(209, 20%, 32%)',
      buttonBgColor: 'hsl(209, 20%, 55%)',
      buttonTextColor: 'rgba(255, 255, 255, 1)',
      scrimColor: 'rgba(0, 0, 0, .7)',
    },
  },
  {
    id: Theme.Dark,
    values: {
      appBgColor: 'hsl(208, 19%, 16%)',
      appAccentColor: '#9DAEBE',
      primaryTextColor: 'rgba(255, 255, 255, 0.88)',
      secondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      accentTextColor: '#9DAEBE',
      dividerColor: 'rgba(255, 255, 255, 0.1)',
      highlightBgColor: 'rgba(255, 255, 255, 0.05)',
      sidebarBgColor: 'hsl(208, 19%, 18%)',
      buttonBgColor: '#415262',
      buttonTextColor: 'rgba(255, 255, 255, 0.98)',
      scrimColor: 'rgba(0, 0, 0, .7)',
    },
  },
  {
    id: Theme.Darker,
    values: {
      appBgColor: 'hsl(0, 0%, 12%)',
      appAccentColor: 'rgba(255, 255, 255, 0.9)',
      primaryTextColor: 'rgba(255, 255, 255, 0.8)',
      secondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      accentTextColor: 'rgba(255, 255, 255, 0.9)',
      dividerColor: 'rgba(255, 255, 255, 0.1)',
      highlightBgColor: 'rgba(255, 255, 255, 0.05)',
      sidebarBgColor: 'hsl(0, 0%, 13%)',
      buttonBgColor: '#3d3d3d',
      buttonTextColor: '#ffffff',
      scrimColor: 'rgba(0, 0, 0, .7)',
    },
  },
  {
    id: Theme.Darkest,
    values: {
      appBgColor: 'hsl(0, 0%, 0%)',
      appAccentColor: '#ffffff',
      primaryTextColor: 'rgba(255, 255, 255, 0.88)',
      secondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      accentTextColor: '#ffffff',
      dividerColor: 'rgba(255, 255, 255, 0.2)',
      highlightBgColor: 'rgba(255, 255, 255, 0.1)',
      sidebarBgColor: 'hsl(0, 0%, 0%)',
      buttonBgColor: '#292929',
      buttonTextColor: '#ffffff',
      scrimColor: 'rgba(0, 0, 0, .7)',
    },
  },
];
