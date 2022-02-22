import './App.css';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';
import Header from './components/Header/Header';
import { SnackbarProvider } from 'notistack';
import { PrivateRoute } from './components/PrivateRoute';
import { useSelector } from 'react-redux';

const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'));
const Home = lazy(() => import('./pages/Home/Home'));
const Profile = lazy(() => import('./pages/Profile/Profile'));

function App() {
  const { loggedIn } = useSelector(state => state.authentication);
  console.log(loggedIn);
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      {loggedIn && (
        <Box sx={{ flexGrow: 1 }}>
          <Header />
        </Box>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Register />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </SnackbarProvider>
  )
}

export default App;
