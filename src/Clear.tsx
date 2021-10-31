import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ListItemIcon, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


interface Props {
  clear: () => void;
}

export default function Clear(props: Props) {
  const [open, setOpen] = React.useState(false);

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
          <DeleteIcon fontSize="large" />
        </ListItemIcon>
      </MenuItem>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle >
          {"Slet spil?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Nåhr, nej</Button>
          <Button onClick={() => {props.clear(); handleClose()}} autoFocus>Ægte!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
