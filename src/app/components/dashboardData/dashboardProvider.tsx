"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext<any>(null);

export function DashboardProvider({
  children,
  session: initialSession,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [session, setSession] = useState(initialSession);

  const refreshSession = async () => {
    try {
      const res = await fetch("/api/auth/get-session");
      const data = await res.json();
      setSession(data);
    } catch (error) {
      console.error("Failed to refresh session:", error);
    }
  };

  return (
    <DashboardContext.Provider value={{ session, refreshSession }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}