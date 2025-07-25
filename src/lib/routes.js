import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import Home from 'components/Home/Home';
import Layout from 'components/layout';
import Dashboard from 'components/dashboard';
import Profile from 'components/profile';
import Users from 'components/users';
import RenderPost from 'components/renderpost/RenderPost';
import Hero from 'components/Hero/Hero';
import { Reset } from 'components/auth/Reset';


export const ROOT = '/';
export const LOGIN = '/login';
export const REGISTER = '/register';
export const RESET = '/reset';

export const PROTECTED = '/protected';
export const DASHBOARD = '/protected/dashboard';
export const USERS = '/protected/users';
export const PROFILE = '/protected/profile/:id';
export const RENDER_POST = '/protected/posts'; 
export const HERO = '/protected/hero'; 


export const router = createBrowserRouter([
  { path: ROOT, element: <Home /> },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  { path: RESET, element: <Reset /> },
  {
    path: PROTECTED,
    element: <Layout />,
    children: [
      {
        path: DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: USERS,
        element: <Users />,
      },
      {
        path: PROFILE,
        element: <Profile />,
      },
      {
        path: RENDER_POST, 
        element: <RenderPost />, 
      },
      {
        path: HERO, 
        element: <Hero />, 
      },

    ],
  },
]);
