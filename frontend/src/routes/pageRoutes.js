import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { pages } from "./helper";
import { constants, routes } from "../config/constant";

const PrivateLayout = lazy(() =>
  import("../layouts/privateLayout/privateLayout")
);

const PageRoutes = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  const filteredPages = pages.filter(({ isPrivate, roles }) => {
    if (isPrivate) {
      return user && roles.includes(user.role);
    }
    return true;
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(constants.user)));
    setUserLoaded(true);
  }, [currentPath]);

  if (!userLoaded) {
    return <LinearProgress />;
  }

  return (
    <Routes>
      {filteredPages.map(({ path, Component, key, isPrivate }) => (
        <Route
          key={key}
          path={path}
          element={
            <Suspense fallback={<LinearProgress />}>
              {isPrivate && path !== routes.NOT_FOUND_ROUTE ? (
                <PrivateLayout>
                  <Component />
                </PrivateLayout>
              ) : (
                <Component />
              )}
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default PageRoutes;
