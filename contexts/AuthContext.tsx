'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { BigSkyEatsUser, validateToken, getAuthToken, removeAuthToken, storeAuthToken } from '../lib/auth';

interface AuthContextType {
  user: BigSkyEatsUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: BigSkyEatsUser) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<BigSkyEatsUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  const login = (newToken: string, newUser: BigSkyEatsUser) => {
    setToken(newToken);
    setUser(newUser);
    storeAuthToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    removeAuthToken();
  };

  const refreshUser = async () => {
    const storedToken = getAuthToken();
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await validateToken(storedToken);
      if (response.success && response.user) {
        setToken(storedToken);
        setUser(response.user);
      } else {
        // Token is invalid, remove it
        removeAuthToken();
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Error validating token:', error);
      removeAuthToken();
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}