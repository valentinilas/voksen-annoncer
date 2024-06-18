import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { useState, useEffect } from 'react';

const AdminRoute = ({ children }) => {
  const { session, isLoadingSession } = useAuth();
  const { profileData } = useAuth();
  const { profile, loading: profileLoading, error: profileError } = profileData;
  const { is_admin } = profile || {};
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isLoadingSession && !profileLoading) {
      setIsSessionLoaded(true);
    }
  }, [isLoadingSession, profileLoading]);

  if (isLoadingSession || profileLoading || !isSessionLoaded) {
    // Display a loading indicator while the session and profile are being fetched
    return <div className="container mx-auto bg-base-200  p-5  rounded-box">
    <p >Loading...</p>
  </div>;
  }

  if (!session) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  if (!is_admin) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default AdminRoute;
