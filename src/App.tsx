import { kebabCase } from 'lodash';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar';
import { DeviceProvider } from './contexts/DeviceProvider';
import { SettingsProvider, useSettings } from './contexts/SettingsProvider';
import { TextSize } from './models';
import { AppInfo } from './routes/AppInfo';
import { AppSettings } from './routes/AppSettings';
import { Category } from './routes/Category';
import { Device } from './routes/Device';
import { Home } from './routes/Home';
import { themes } from './themes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 600000,
    },
  },
});

export function AppWrapper(): JSX.Element {
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <DeviceProvider>
            <App />
          </DeviceProvider>
        </SettingsProvider>
      </QueryClientProvider>
    </HashRouter>
  );
}

export function App(): JSX.Element {
  const { settings } = useSettings();

  useEffect(() => {
    // Theme
    const theme = themes.find((a) => a.id === settings.theme) || themes[0];
    for (const id in theme.values) {
      document.documentElement.style.setProperty(`--${kebabCase(id)}`, theme.values[id]);
    }

    const fontSize = {
      [TextSize.Smallest]: 9,
      [TextSize.Small]: 10,
      [TextSize.Medium]: 11,
      [TextSize.Large]: 12,
      [TextSize.Largest]: 13,
    };
    document.documentElement.style.setProperty(
      '--base-font-size',
      `${fontSize[settings.textSize]}px`
    );
  }, [settings]);

  return (
    <div className={styles.root}>
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/device">
          <Device />
        </Route>
        <Route exact path="/category/:categoryId">
          <Category />
        </Route>
        <Route exact path="/app/:slug">
          <AppInfo />
        </Route>
        <Route exact path="/settings">
          <AppSettings />
        </Route>
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);
