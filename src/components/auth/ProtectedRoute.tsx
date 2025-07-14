import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireNutritionist?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requireAdmin = false, 
  requireNutritionist = false 
}: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isNutritionist } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requireNutritionist && !isNutritionist) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;