"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext<any>(null);

export function UserProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: any;
}) {
  const [user, setUser] = useState(initialUser);

  const updateUser = (data: any) => {
    setUser(data);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}