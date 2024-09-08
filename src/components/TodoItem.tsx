import {
  Checkbox,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { memo } from "react";

////////////////////////////////////////////////////////////////////////////////////
//                        Interfaces
////////////////////////////////////////////////////////////////////////////////////

interface TodosItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
}

////////////////////////////////////////////////////////////////////////////////////
//                  Component function
////////////////////////////////////////////////////////////////////////////////////

function TodosItem({ id, title, completed, onToggle }: TodosItemProps) {
  const handleToggle = () => {
    onToggle(id);
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleToggle} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={completed}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
}

export default memo(TodosItem);
