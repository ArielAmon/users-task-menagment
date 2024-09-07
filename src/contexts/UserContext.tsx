import React, { createContext, useState, useEffect, ReactNode } from "react";
import { IUser } from "../Interface/IUser";

interface UserContextType {
  selectedUser: IUser | null;
  setSelectedUser: (user: IUser | null) => void;
  hideCompleted: boolean;
  setHideCompleted: (hide: boolean) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  useEffect(() => {
    const storedHideCompleted = sessionStorage.getItem("hideCompleted");
    if (storedHideCompleted) {
      setHideCompleted(storedHideCompleted === "true");
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("hideCompleted", hideCompleted.toString());
  }, [hideCompleted]);

  return (
    <UserContext.Provider
      value={{ selectedUser, setSelectedUser, hideCompleted, setHideCompleted }}
    >
      {children}
    </UserContext.Provider>
  );
};
