import { useState, useEffect } from 'react'

// Router
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { HashRouter } from "react-router-dom";

import RootLayout from './pages/root-layout';

import ProtectedRoute from './components/protected-route/protected-route';
import AdminRoute from './components/protected-route/admin-route';


// Auth
import { supabase } from './lib/supabase';

// Pages
import Home from './pages/home';
import SignIn from './components/sign-in/sign-in';
import SignUp from './components/sign-up/sign-up';
import CreateAd from './components/create-ad/create-ad';
import AdDetail from './components/ad-detail/ad-detail';
import Dashboard from './components/dashboard/dashboard';
import SignUpWelcome from './components/sign-up/sign-up-welcome';
import Admin from './components/dashboard/admin-page';
import Support from './pages/support';
import CookiePolicy from './pages/cookie-policy';
import About from './pages/about';



function App() {

  // Routing
  const router = createHashRouter([
    {
      path: "/",
      element: <RootLayout />,
      // Loaded in the outlet component
      children: [
        { path: '/', element: <Home /> },
        { path: '/support', element: <Support /> },
        { path: '/about', element: <About/> },
        { path: '/cookie-policy', element: <CookiePolicy /> },
        { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
        { path: '/admin', element: <AdminRoute><Admin /></AdminRoute> },
        { path: '/new-ad', element: <ProtectedRoute><CreateAd /></ProtectedRoute> },
        { path: '/sign-up', element: <SignUp /> },
        { path: '/sign-in', element: <SignIn /> },
        { path: '/welcome', element: <SignUpWelcome /> },
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
