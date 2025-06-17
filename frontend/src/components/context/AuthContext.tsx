"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  clientId: number | null;
  setClientId: (id: number | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [clientId, setClientIdState] = useState<number | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("clientId");
    if (storedId) setClientIdState(Number(storedId));
  }, []);

  const setClientId = (id: number | null) => {
    if (id) {
      localStorage.setItem("clientId", id.toString());
      setClientIdState(id);
    } else {
      localStorage.removeItem("clientId");
      setClientIdState(null);
    }
  };

  const logout = () => {
    setClientId(null);
    localStorage.removeItem("admLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ clientId, setClientId, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
