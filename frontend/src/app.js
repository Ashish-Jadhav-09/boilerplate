import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ErrorBoundry } from './components';
import { CssBaseline, Typography } from '@mui/material';
import { PrivateRoute } from './routes';
import { client } from './apolloClient';
import { SnackBarProvider } from './context';

const App = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f0' }}>
      <ErrorBoundry>
        <ApolloProvider client={client}>
            <SnackBarProvider>
              <Typography>
                <CssBaseline />
                <PrivateRoute />
              </Typography>
            </SnackBarProvider>
        </ApolloProvider>
      </ErrorBoundry>
    </div>
  );
}

export default App;
