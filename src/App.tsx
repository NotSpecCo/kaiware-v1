import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar';
import { DeviceProvider } from './contexts/DeviceProvider';
import { SettingsProvider } from './contexts/SettingsProvider';
import { Category } from './routes/Category';
import { Home } from './routes/Home';
import { getDeviceInfo } from './services/device';

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
  useEffect(() => {
    getDeviceInfo();
  }, []);
  return (
    <div className={styles.root}>
      {/* <nav className={styles.sidebar}> */}
      <Sidebar />
      {/* </nav>
      <main className={styles.content}> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/category/:categoryId">
          <Category />
        </Route>
      </Switch>
      {/* </main> */}
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);
