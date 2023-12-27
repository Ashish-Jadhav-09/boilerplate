import React from "react";
import { ApolloProvider } from "@apollo/client";
import { ErrorBoundry } from "./components";
import { CssBaseline, Typography } from "@mui/material";
import { PageRoutes } from "./routes";
import { client } from "./apolloClient";
import { SnackBarProvider } from "./context";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <ErrorBoundry>
      <ApolloProvider client={client}>
        <SnackBarProvider>
          <Typography>
            <CssBaseline />
            <BrowserRouter>
              <PageRoutes />
            </BrowserRouter>
          </Typography>
        </SnackBarProvider>
      </ApolloProvider>
    </ErrorBoundry>
  );
};

export default App;
