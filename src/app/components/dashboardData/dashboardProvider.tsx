"use client";

import { createContext, useContext, useState } from "react";

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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${encodeURIComponent(session.user.email)}`
    );

    const data = await res.json();

    if (data.success) {
      setSession({
        ...session,
        user: data.data,
      });
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        session,
        refreshSession,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}