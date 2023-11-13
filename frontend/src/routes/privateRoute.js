import { LinearProgress } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { PrivateLayout } from '../layouts/privateLayout';

const Login = lazy(() => import('../pages/login/login'));
const RegisterUser = lazy(() => import('../pages/registerUser/registerUser'));
const AdminDashboard = lazy(() => import('../pages/admin/adminDashboard/adminDashboard'));
const UserManagement = lazy(() => import('../pages/admin/userManagement/userManagement'));
const Dashboard = lazy(() => import('../pages/dashboard/dashboard'));

const PrivateRoute = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <Suspense
            fallback={
              <div>
                <LinearProgress />
              </div>
            }
          >
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register-user"
        element={
          <Suspense
            fallback={
              <div>
                <LinearProgress />
              </div>
            }
          >
            <RegisterUser />
          </Suspense>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <Suspense
            fallback={
              <div>
                <LinearProgress />
              </div>
            }
          >
            <PrivateLayout>
              <AdminDashboard />
            </PrivateLayout>
          </Suspense>
        }
      />
      <Route
        path="/admin-dashboard/user-management"
        element={
          <Suspense
            fallback={
              <div>
                <LinearProgress />
              </div>
            }
          >
            <PrivateLayout>
              <UserManagement />
            </PrivateLayout>
          </Suspense>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Suspense
            fallback={
              <div>
                <LinearProgress />
              </div>
            }
          >
            <PrivateLayout>
              <Dashboard />
            </PrivateLayout>
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default PrivateRoute;
