'use client';

import { createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: 'google' | 'github';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Mock user for portfolio demonstration
  const user: User | null = {
    id: 'demo-user',
    name: 'Heejun Seo',
    email: 'seoheejun@gmail.com',
    provider: 'google',
  };

  const loginWithGoogle = async () => {
    // Mock implementation for portfolio
    console.log('Mock Google login');
  };

  const loginWithGithub = async () => {
    // Mock implementation for portfolio
    console.log('Mock GitHub login');
  };

  const logout = async () => {
    // Mock implementation for portfolio
    console.log('Mock logout');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: false,
        isAuthenticated: true,
        loginWithGoogle,
        loginWithGithub,
        logout,
      }}>
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
