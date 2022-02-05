import './App.css';

import React from 'react';
import { Col, Layout, Row } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import LoginPage from './pages/Login/LoginPage';

import {
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import RegistrationPage from './pages/Registration/Registration';

import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className='vh100' >
      <Header className='social__layout'>
        <Row justify="space-between">
          <Col>
            <h1 className='logo'>
              <NavLink to={''}>
                SOCIAL NETWORK
              </NavLink>
            </h1>
          </Col>
          <Col>
            <NavLink to={'login'} >LOGIN</NavLink>
            <NavLink to={'/registration'} >REGISTRATION</NavLink>
          </Col>
        </Row>
      </Header>

      <Content className='social__content'>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Content>

      <Footer>Footer</Footer>
    </Layout>
  )
}

export default App;
