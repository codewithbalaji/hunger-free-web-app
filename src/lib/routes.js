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


export const ROOT = '/';
export const LOGIN = '/login';
export const REGISTER = '/register';

export const PROTECTED = '/protected';
export const DASHBOARD = '/protected/dashboard';
export const USERS = '/protected/users';
export const PROFILE = '/protected/profile/:id';
export const RENDER_POST = '/protected/posts'; // Changed variable name to match the import
export const HERO = '/protected/hero'; 


export const router = createBrowserRouter([
  { path: ROOT, element: <Home /> },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
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
        path: RENDER_POST, // Using the variable for the path
        element: <RenderPost />, // Using the RenderPost component
      },
      {
        path: HERO, // Using the variable for the path
        element: <Hero />, // Using the RenderPost component
      },

    ],
  },
]);
