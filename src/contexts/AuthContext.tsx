import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
}

interface AuthContextProps {
  user: User | null;
  signin: (user: User) => void;
  signout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, signin, signout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider");
  }
  return context;
};
