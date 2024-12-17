import { isAuthenticated } from '../utils/auth';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default ProtectedRoute;
