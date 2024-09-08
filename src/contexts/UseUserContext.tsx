import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

//------------------------------------------------------------------------------------------
//
// This separation of UserContext and useUserContext resolve the warning
//
// "userContext component Fast refresh only works
//  when a file only exports components. Use a new file to share constants or functions
//  between components"
//
//  The warning you're seeing is related to the React Fast Refresh feature,
//  which is designed to work best when files only export React components.
//
//  The UserContext.tsx file now only exports the context and the provider
//  component, while useUserContext.ts exports the hook.
//
//
//------------------------------------------------------------------------------------------
