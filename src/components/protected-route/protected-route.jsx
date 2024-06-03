
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';

/**
 * Redirects child component to login if the user is not logged in
 */
const ProtectedRoute = ({ children }) => {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
