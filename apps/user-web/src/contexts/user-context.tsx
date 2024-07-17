'use client';

import { createContext, useContext } from 'react';

export type User = {
  id: string;
  email: string;
};

const UserContext = createContext<User | null>(null);

export const UserContextProvider = ({
  value,
  children,
}: {
  value: User | null;
  children: React.ReactNode;
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext<User | null>(UserContext);
