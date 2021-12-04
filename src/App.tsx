import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar';
import { DeviceProvider } from './contexts/DeviceProvider';
import { SettingsProvider } from './contexts/SettingsProvider';
import { AppInfo } from './routes/AppInfo';
import { Category } from './routes/Category';
import { Device } from './routes/Device';
import { Home } from './routes/Home';

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
