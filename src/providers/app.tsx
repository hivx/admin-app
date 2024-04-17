import { Stack, Typography } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { BASE_URL } from '@/config';
import { AppStore, persistor } from '@/stores/redux';

import { AuthProvider, useAuth } from './AuthProvider';
import { DayjsProvider } from './DayjsProvider';
import { HospitalCommonProvider } from './HospitalCommonProvider';
import { HospitalConfigProvider } from './HospitalConfigProvider';
import { NotificationProvider } from './NotificationProvider';
import { MyThemeProvider } from './ThemeProvider';
import { TranslateProvider } from './TranslateProvider';

const ErrorFallback = (props: FallbackProps) => {
  const { error } = props;
  const { logout } = useAuth();
  logout();
  return (
    <Stack width="100%" height="100%">
      <Typography variant="h2" color="error">
        Ooops, something went wrong :(
      </Typography>
      <Typography variant="h5" color="error">
        {error.message}
      </Typography>
      <Typography variant="h2" color="error">
        Stack trace
      </Typography>
      <Typography variant="h6" whiteSpace="pre">
        {error.stack}
      </Typography>
    </Stack>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
  store: AppStore;
};

export const AppProvider = ({ children, store }: AppProviderProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router basename={BASE_URL}>
          <AuthProvider>
            <TranslateProvider>
              <DayjsProvider>
                <React.Suspense fallback={<FullPageSpinner />}>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <MyThemeProvider>
                      <SnackbarProvider maxSnack={5}>
                        <NotificationProvider>
                          <HelmetProvider>
                            <HospitalCommonProvider>
                              <HospitalConfigProvider>{children}</HospitalConfigProvider>
                            </HospitalCommonProvider>
                          </HelmetProvider>
                        </NotificationProvider>
                      </SnackbarProvider>
                    </MyThemeProvider>
                  </ErrorBoundary>
                </React.Suspense>
              </DayjsProvider>
            </TranslateProvider>
          </AuthProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
};
