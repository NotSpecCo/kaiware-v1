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
      appBgColor: 'hsl(0, 0%, 100%)',
      appAccentColor: '#000000',
      primaryTextColor: 'rgba(0, 0, 0, 0.88)',
      secondaryTextColor: 'rgba(0, 0, 0, 0.5)',
      accentTextColor: '#000000',
      dividerColor: 'rgba(0, 0, 0, 0.1)',
      highlightBgColor: 'rgba(0, 0, 0, 0.05)',
      sidebarBgColor: 'hsl(0, 0%, 98%)',
      buttonBgColor: '#000000',
      buttonTextColor: '#ffffff',
      scrimColor: 'rgba(255, 255, 255, .7)',
    },
  },
  {
    id: Theme.Warm,
    values: {
      appBgColor: 'hsl(54, 100%, 97%)',
      appAccentColor: 'hsl(54, 70%, 70%)',
      primaryTextColor: 'rgba(0, 0, 0, 0.88)',
      secondaryTextColor: 'rgba(0, 0, 0, 0.5)',
      accentTextColor: 'hsl(54, 70%, 70%)',
      dividerColor: 'rgba(0, 0, 0, 0.1)',
      highlightBgColor: 'rgba(0, 0, 0, 0.05)',
      sidebarBgColor: 'hsl(54, 100%, 96%)',
      buttonBgColor: 'hsl(54, 70%, 70%)',
      buttonTextColor: 'rgba(0, 0, 0, 0.88)',
      scrimColor: 'rgba(0, 0, 0, .7)',
    },
  },
  {
    id: Theme.Blue,
    values: {
      appBgColor: 'hsl(209, 20%, 32%)',
      appAccentColor: 'hsl(209, 20%, 55%)',
      primaryTextColor: 'rgba(255, 255, 255, 0.88)',
      secondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      accentTextColor: 'hsl(209, 20%, 55%)',
      dividerColor: 'rgba(255, 255, 255, 0.1)',
      highlightBgColor: 'rgba(255, 255, 255, 0.05)',
      sidebarBgColor: 'hsl(209, 20%, 30%)',
      buttonBgColor: 'hsl(209, 20%, 55%)',
      buttonTextColor: 'rgba(255, 255, 255, 1)',
      scrimColor: 'rgba(0, 0, 0, .7)',
    },
  },
  {
    id: Theme.Dark,
    values: {
      appBgColor: 'hsl(208, 19%, 18%)',
      appAccentColor: 'hsl(209, 20%, 35%)',
      primaryTextColor: 'rgba(255, 255, 255, 0.88)',
      secondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      accentTextColor: 'hsl(209, 20%, 35%)',
      dividerColor: 'rgba(255, 255, 255, 0.1)',
      highlightBgColor: 'rgba(255, 255, 255, 0.05)',
      sidebarBgColor: 'hsl(208, 19%, 16%)',
      buttonBgColor: '#415262',
      buttonTextColor: 'rgba(255, 255, 255, 0.98)',
      scrimColor: 'rgba(0, 0, 0, .7)',
    },
  },
  {
    id: Theme.Darker,
    values: {
      appBgColor: 'hsl(0, 0%, 13%)',
      appAccentColor: '#3d3d3d',
      primaryTextColor: 'rgba(255, 255, 255, 0.8)',
      secondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      accentTextColor: '#3d3d3d',
      dividerColor: 'rgba(255, 255, 255, 0.1)',
      highlightBgColor: 'rgba(255, 255, 255, 0.05)',
      sidebarBgColor: 'hsl(0, 0%, 12%)',
      buttonBgColor: '#3d3d3d',
      buttonTextColor: '#ffffff',
      scrimColor: 'rgba(0, 0, 0, .7)',
    },
  },
  {
    id: Theme.Darkest,
    values: {
      appBgColor: 'hsl(0, 0%, 0%)',
      appAccentColor: '#292929',
      primaryTextColor: 'rgba(255, 255, 255, 0.88)',
      secondaryTextColor: 'rgba(255, 255, 255, 0.5)',
      accentTextColor: '#292929',
      dividerColor: 'rgba(255, 255, 255, 0.2)',
      highlightBgColor: 'rgba(255, 255, 255, 0.1)',
      sidebarBgColor: 'hsl(0, 0%, 0%)',
      buttonBgColor: '#292929',
      buttonTextColor: '#ffffff',
      scrimColor: 'rgba(0, 0, 0, .7)',
    },
  },
];
