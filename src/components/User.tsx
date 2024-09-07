import React from "react";
import Card from "@mui/material/Card";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IUser } from "../Interface/IUser";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { lighten } from "@mui/material/styles";
import { useUserContext } from "../contexts/UseUserContext.tsx";

interface ClickableCardProps {
  userData: IUser;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  transition: "all 0.3s ease-in-out",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isSelected
    ? lighten(theme.palette.primary.light, 0.7)
    : theme.palette.background.paper,
  border: isSelected
    ? `2px solid ${theme.palette.primary.main}`
    : `1px solid ${theme.palette.divider}`,
  boxShadow: isSelected ? theme.shadows[4] : theme.shadows[1],
  "&:hover": {
    boxShadow: theme.shadows[3],
  },
  height: "80px", // Fixed height for consistency
  width: "100%", // Full width of the grid item
}));

const UserInfo = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "16px",
});

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  backgroundColor: theme.palette.primary.main,
  fontSize: "1rem",
  fontWeight: "bold",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: "100px",
  borderRadius: theme.shape.borderRadius,
}));

function User({ userData }: ClickableCardProps) {
  const { username, name, id } = userData;
  const { selectedUser, setSelectedUser } = useUserContext();

  const isSelected = selectedUser?.id === id;

  const handleShowTodos = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isSelected) {
      setSelectedUser(null);
    } else {
      setSelectedUser(userData);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <StyledCard isSelected={isSelected}>
      <UserInfo>
        <UserAvatar>{getInitials(name)}</UserAvatar>
        <div>
          <Typography variant="subtitle1" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{username}
          </Typography>
        </div>
      </UserInfo>
      <StyledButton
        variant={isSelected ? "contained" : "outlined"}
        color="primary"
        size="small"
        onClick={handleShowTodos}
      >
        {isSelected ? "Hide Todos" : "Show Todos"}
      </StyledButton>
    </StyledCard>
  );
}

export default User;
