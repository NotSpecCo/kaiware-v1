import { kebabCase } from 'lodash';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import { ErrorBoundary } from './components/ErrorBoundery';
import { Sidebar } from './components/Sidebar';
import { DeviceProvider } from './contexts/DeviceProvider';
import { PanelsProvider } from './contexts/PanelsProvider';
import { SettingsProvider, useSettings } from './contexts/SettingsProvider';
import { TextSize } from './models';
import { AppSettings } from './routes/AppSettings';
import { Categories } from './routes/Categories';
import { Device } from './routes/Device';
import { Home } from './routes/Home';
import { Search } from './routes/Search';
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
    <ErrorBoundary>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <SettingsProvider>
            <DeviceProvider>
              <PanelsProvider>
                <App />
              </PanelsProvider>
            </DeviceProvider>
          </SettingsProvider>
        </QueryClientProvider>
      </HashRouter>
    </ErrorBoundary>
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

    document.documentElement.style.setProperty('--app-accent-color', `${settings.accentColor}`);
    document.documentElement.style.setProperty('--accent-text-color', `${settings.accentColor}`);
    document.documentElement.style.setProperty('--button-bg-color', `${settings.accentColor}`);

    document.documentElement.style.setProperty(
      '--button-text-color',
      settings.accentTextColor === 'light' ? 'rgba(255,255,255,.95)' : 'rgba(0,0,0,.95)'
    );

    const fontSize = {
      [TextSize.Smallest]: 8,
      [TextSize.Small]: 9,
      [TextSize.Medium]: 10,
      [TextSize.Large]: 11,
      [TextSize.Largest]: 12,
    };
    document.documentElement.style.setProperty(
      '--base-font-size',
      `${fontSize[settings.textSize]}px`
    );
  }, [settings]);

  return (
    <div className={styles.root}>
      <Sidebar />
      <ErrorBoundary>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/device">
            <ErrorBoundary>
              <Device />
            </ErrorBoundary>
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route exact path="/settings">
            <AppSettings />
          </Route>
        </Switch>
      </ErrorBoundary>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);
