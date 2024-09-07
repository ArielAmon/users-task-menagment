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
  const [selectedUser, setSelectedUser] = useState<IUser | null>(() => {
    const storedUser = sessionStorage.getItem("selectedUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [hideCompleted, setHideCompleted] = useState<boolean>(() => {
    return sessionStorage.getItem("hideCompleted") === "true";
  });

  useEffect(() => {
    if (selectedUser) {
      sessionStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    } else {
      sessionStorage.removeItem("selectedUser");
      sessionStorage.removeItem("hideCompleted");
      setHideCompleted(false);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      sessionStorage.setItem("hideCompleted", hideCompleted.toString());
    }
  }, [hideCompleted, selectedUser]);

  return (
    <UserContext.Provider
      value={{ selectedUser, setSelectedUser, hideCompleted, setHideCompleted }}
    >
      {children}
    </UserContext.Provider>
  );
};
