import { createContext, useContext, useState, ReactNode } from 'react';
import { mockUsers, User } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginBypass: (role: 'admin' | 'nutritionist') => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isNutritionist: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would be API call
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('authUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const loginBypass = (role: 'admin' | 'nutritionist') => {
    const foundUser = mockUsers.find(u => u.role === role);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('authUser', JSON.stringify(foundUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  // Check if user is stored in localStorage on app load
  const checkStoredAuth = () => {
    const stored = localStorage.getItem('authUser');
    if (stored && !user) {
      setUser(JSON.parse(stored));
    }
  };

  // Call on mount
  if (!user) {
    checkStoredAuth();
  }

  const value: AuthContextType = {
    user,
    login,
    loginBypass,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isNutritionist: user?.role === 'nutritionist'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};