import './App.css';
import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Header from './components/Header/Header';
import { SnackbarProvider } from 'notistack';
import { PrivateRoute } from './components/PrivateRoute';
import { useSelector } from 'react-redux';
import { LinearProgress, CircularProgress } from '@mui/material';

const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'));
const Home = lazy(() => import('./pages/Home/Home'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Chat = lazy(() => import('./pages/Chat/Chat'));

function App() {
  const { loggedIn, loading } = useSelector(state => state.authentication);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [loggedIn])

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

      {loading && (
        <Box sx={{ width: '100%', position: 'fixed' }}>
          <LinearProgress />
        </Box>
      )}

      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path='/login' element={
            loggedIn ? <Home /> : <Login />
          } />
          <Route path='/registration' element={
            loggedIn ? <Home /> : <Register />
          } />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </SnackbarProvider>
  )
}

export default App;
