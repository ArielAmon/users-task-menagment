import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { IUser } from "./Interface/IUser";
import { ApiUser } from "./Interface/ApiUser";
import {
  Box,
  CircularProgress,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { API_URL } from "./Constants/Global";

////////////////////////////////////////////////////////////////////////////////////
//                    Styled components
////////////////////////////////////////////////////////////////////////////////////

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)",
  },
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

////////////////////////////////////////////////////////////////////////////////////
//                  API Functions
////////////////////////////////////////////////////////////////////////////////////
async function fetchUsers(): Promise<ApiUser[]> {
  const response = await fetch(API_URL + "users");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: ApiUser[] = await response.json();
  return data;
}

////////////////////////////////////////////////////////////////////////////////////
//                  Utilities Functions
////////////////////////////////////////////////////////////////////////////////////
function transformUsers(apiUsers: ApiUser[]): IUser[] {
  return apiUsers.map(({ id, name, username }) => ({
    id,
    name,
    username,
  }));
}

////////////////////////////////////////////////////////////////////////////////////
//                  Component function
////////////////////////////////////////////////////////////////////////////////////

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

  //--------------------------------------------------------------------------------
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  //--------------------------------------------------------------------------------

  if (error) {
    return (
      <StyledPaper>
        <Typography color="error" variant="h6" textAlign="center">
          Error: {error}
        </Typography>
      </StyledPaper>
    );
  }

  //--------------------------------------------------------------------------------
  return (
    <>
      <div className="modern-gradient-background"></div>
      <div className="app-content">
        <h1 className="app-title">TaskMaster</h1>
        <p className="app-description">
          Welcome to TaskMaster, your personal user-centric todo list manager.
          Organize tasks efficiently and boost productivity for multiple users.
        </p>
        <div className="user-list-container">
          <Outlet context={{ users }} />
        </div>
      </div>
    </>
  );
}

export default App;
