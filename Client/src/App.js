import './App.css';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';
import Header from './components/Header/Header';

const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'));
const Home = lazy(() => import('./pages/Home/Home'));
const Profile = lazy(() => import('./pages/Profile/Profile'));

function App() {
  const isAuth = true;

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {isAuth ? <Header /> : false}
      </Box>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App;
