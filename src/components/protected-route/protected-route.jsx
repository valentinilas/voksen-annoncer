
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { useState, useEffect } from 'react';

/**
 * Redirects child component to login if the user is not logged in
 */
const ProtectedRoute = ({ children }) => {
  const { session, isLoadingSession } = useAuth();
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  const location = useLocation();


  useEffect(() => {
    if (!isLoadingSession) {
      setIsSessionLoaded(true);
    }
  }, [isLoadingSession]);

  if (isLoadingSession || !isSessionLoaded) {
    // Display a loading indicator while the session is being fetched
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
