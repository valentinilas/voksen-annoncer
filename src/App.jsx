import { useState, useEffect } from 'react'

// Router
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { HashRouter } from "react-router-dom";

import RootLayout from './pages/root-layout';

import ProtectedRoute from './components/protected-route/protected-route';

// Auth
import { supabase } from './lib/supabase';

// Pages
import Home from './pages/home';
import SignIn from './components/sign-in/sign-in';
import SignUp from './components/sign-up/sign-up';
import CreateAd from './components/create-ad/create-ad';
import AdDetail from './components/ad-detail/ad-detail';
import Dashboard from './components/dashboard/dashboard';




function App() {

  // Routing
  const router = createHashRouter([
    {
      path: "/",
      element: <RootLayout />,
      // Loaded in the outlet component
      children: [
        { path: '/', element: <Home /> },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/new-ad', element: <ProtectedRoute><CreateAd /></ProtectedRoute> },
        { path: '/sign-up', element: <SignUp /> },
        { path: '/sign-in', element: <SignIn /> },
        { path: '/ad/:adId', element: <AdDetail /> },
      ]
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
