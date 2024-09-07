import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

import User from "./User.tsx";
import { IUser } from "../Interface/IUser";
import TodosList from "./Todolist.tsx";
import { useUserContext } from "../contexts/UseUserContext.tsx";
/////////////////////////////////////////////////////////////////////////////////////////

interface UsersListProps {
  users: IUser[];
}

/////////////////////////////////////////////////////////////////////////////////////////

function UsersList({ users }: UsersListProps) {
  const { selectedUser } = useUserContext();

  /////////////////////////////////////////////////////////////////////////////////////////
  // const handleUserSelected = useCallback(
  //   (id: number) => {
  //     setSelectedUser(users.find((user) => user.id === id) || null);
  //   },
  //   [users, setSelectedUser]
  // );

  /////////////////////////////////////////////////////////////////////////////////////////
  // const memoizedTodosList = useMemo(() => {
  //   return selectedUser ? <TodosList userId={selectedUser.id} /> : null;
  // }, [selectedUser]);

  /////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={10}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          size={6}
        >
          {users.map((user) => (
            <Grid key={user.id} size={12}>
              <User userData={user} />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          size={6}
          style={{ height: "calc(100vh - 100px)" }}
        >
          {selectedUser && <TodosList userId={selectedUser.id} />}{" "}
        </Grid>
      </Grid>
    </Box>
  );
}

export default UsersList;
