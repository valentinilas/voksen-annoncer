import { useState, useEffect } from 'react'

// Router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from './pages/root-layout';

import ProtectedRoute from './components/protected-route/protected-route';

// Auth
import { supabase } from './lib/supabase';

// Pages
import Home from './pages/home';
import SignIn from './components/sign-in/sign-in';
import SignUp from './components/sign-up/sign-up';
import CreateAd from './components/create-ad/create-ad';




function App() {
  // const [session, setSession] = useState(null)

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session)
  //   })

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })

  //   return () => subscription.unsubscribe()
  // }, [])

  // if (!session) {
  //   // return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  //   console.log('Not logged in');
  // }
  // else {
  //   // return (<div>Logged in!</div>)
  //   console.log('Logged in');
  // }



  // Routing
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      // Loaded in the outlet component
      children: [
        { path: '/', element: <Home /> },
        { path: 'new-ad', element: <ProtectedRoute><CreateAd /></ProtectedRoute> },
        { path: 'sign-up', element: <SignUp /> },
        { path: 'sign-in', element: <SignIn /> },
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
