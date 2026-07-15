"use client";

import { createContext, useContext } from "react";

const DashboardContext = createContext<any>(null);

export function DashboardProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <DashboardContext.Provider value={session}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}