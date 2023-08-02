import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { ListItemIcon, MenuItem, TextField } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface Props {
  setGroup: (name: string) => void;
  currentGroup: string;
}

export default function GroupName(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [group, setGroup] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <GroupIcon fontSize="large" />
        </ListItemIcon>
      </MenuItem>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Hvilken gruppe"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hvad kalder I den gruppe der spiller?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            onChange={(e) => setGroup(e.target.value)}
            defaultValue={props.currentGroup}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Bliv</Button>
          <Button
            onClick={() => {
              props.setGroup(group);
              handleClose();
            }}
          >
            Skift
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
