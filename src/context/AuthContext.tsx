import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const usersJson = localStorage.getItem('users');
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];
      
      const user = users.find(u => u.email === email);
      
      if (user && user.password === password) {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        setAuthState({
          user: userWithoutPassword,
          isAuthenticated: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    try {
      const usersJson = localStorage.getItem('users');
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];
      
      // Check if user already exists
      const userExists = users.some((u) => u.email === userData.email);
      if (userExists) {
        return false;
      }
      
      // Create new user
      const newUser: User = {
        ...userData,
        id: uuidv4(),
      };
      
      // Save to local storage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Auto login the new user
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true,
      });
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};