import { useEffect, useState } from "react";
import "./App.css";
import UsersList from "./components/UsersList";
import { IUser } from "./Interface/IUser";
import { ApiUser } from "./Interface/ApiUser";
import { CircularProgress } from "@mui/material";
import { UserProvider } from "./contexts/UserContext";

const API_URL: string = "https://jsonplaceholder.typicode.com/";

async function fetchUsers(): Promise<ApiUser[]> {
  const response = await fetch(API_URL + "users");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: ApiUser[] = await response.json();
  return data;
}

function transformUsers(apiUsers: ApiUser[]): IUser[] {
  return apiUsers.map(({ id, name, username }) => ({
    id,
    name,
    username,
  }));
}

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const apiData = await fetchUsers();
        const transformedUsers = transformUsers(apiData);
        setUsers(transformedUsers);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <UserProvider>
      <div className="modern-gradient-background"></div>
      <div className="app-content">
        <h1 className="app-title">TaskMaster</h1>
        <p className="app-description">
          Welcome to TaskMaster, your personal user-centric todo list manager.
          Organize tasks efficiently and boost productivity for multiple users.
        </p>
        <div className="user-list-container">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <UsersList users={users} />
          )}
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
