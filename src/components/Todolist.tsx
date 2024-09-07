import React, { useCallback, useEffect, useState, useMemo } from "react";
import { ITodo } from "../Interface/ITodo";
import {
  CircularProgress,
  FormControlLabel,
  List,
  Paper,
  Stack,
  Typography,
  Switch,
  Box,
  Divider,
} from "@mui/material";
import TodosItem from "./TodoItem";
import { styled } from "@mui/material/styles";
import { useUserContext } from "../contexts/UseUserContext.tsx";

const API_URL: string = "https://jsonplaceholder.typicode.com/";

interface TodosModalProps {
  userId: number;
}

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
  height: "100%", // Take full height of parent
}));

const StyledList = styled(List)(({ theme }) => ({
  overflowY: "auto",
  flexGrow: 1, // Allow list to grow and take available space
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.background.default,
  },
}));

async function fetchTodos(userId: number): Promise<ITodo[]> {
  const response = await fetch(`${API_URL}users/${userId}/todos`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

function TodosList({ userId }: TodosModalProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { hideCompleted, setHideCompleted } = useUserContext();

  const handleTaskToggle = useCallback((taskId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    // Here you would typically also send an update to your backend
  }, []);

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setHideCompleted(event.target.checked);
    },
    [setHideCompleted]
  );

  const filteredTodos = useMemo(() => {
    return hideCompleted ? todos.filter((todo) => !todo.completed) : todos;
  }, [todos, hideCompleted]);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setIsLoading(true);
        const apiData = await fetchTodos(userId);
        if (isMounted) {
          setTodos(apiData);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError(
            error instanceof Error ? error.message : "An unknown error occurred"
          );
          setTodos([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();
    const storedUser = sessionStorage.getItem("selectedUser");
    const storedUserId = storedUser ? JSON.parse(storedUser).id : null;

    if (userId !== storedUserId) {
      setHideCompleted(false);
    } else {
      const storedHideCompleted = sessionStorage.getItem("hideCompleted");
      setHideCompleted(storedHideCompleted === "true");
    }

    return () => {
      isMounted = false;
    };
  }, [userId, setHideCompleted]);

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

  if (error) {
    return (
      <StyledPaper>
        <Typography color="error" variant="h6" textAlign="center">
          Error: {error}
        </Typography>
      </StyledPaper>
    );
  }

  return (
    <StyledPaper elevation={3}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          fontWeight="bold"
          color="primary"
        >
          Todo List
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={hideCompleted}
              onChange={handleFilterChange}
              color="primary"
            />
          }
          label={
            <Typography variant="body2" color="text.secondary">
              Hide completed
            </Typography>
          }
        />
      </Stack>

      <Divider sx={{ marginBottom: 2 }} />

      {filteredTodos.length === 0 ? (
        <Typography variant="body1" textAlign="center" color="text.secondary">
          {todos.length === 0
            ? "No todos found for this user."
            : "No uncompleted todos found."}
        </Typography>
      ) : (
        <StyledList>
          {filteredTodos.map((task) => (
            <TodosItem
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
              onToggle={handleTaskToggle}
            />
          ))}
        </StyledList>
      )}
    </StyledPaper>
  );
}

export default React.memo(TodosList);
