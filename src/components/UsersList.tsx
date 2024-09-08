import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

import User from "./User.tsx";
import { IUser } from "../Interface/IUser";
import { useUserContext } from "../contexts/UseUserContext.tsx";
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";

////////////////////////////////////////////////////////////////////////////////////
//                        Interfacea
////////////////////////////////////////////////////////////////////////////////////

interface UsersListContextType {
  users: IUser[];
}

////////////////////////////////////////////////////////////////////////////////////
//                  Component function
////////////////////////////////////////////////////////////////////////////////////

function UsersList() {
  const { users } = useOutletContext<UsersListContextType>();
  const { userId } = useParams();
  const { setSelectedUser } = useUserContext();

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
              <Link
                to={user.id.toString() === userId ? "/" : `/user/${user.id}`}
                style={{ textDecoration: "none" }}
                onClick={() =>
                  setSelectedUser(user.id.toString() === userId ? null : user)
                }
              >
                <User userData={user} />
              </Link>
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
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}

export default UsersList;
