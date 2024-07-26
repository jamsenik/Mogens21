import * as React from "react";
import {
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


interface Props {
  togglePietRules: () => void;
  pietRules: boolean
}

export default function RuleSet(props: Props) {
  let icon = props.pietRules ? <SportsScoreIcon fontSize="large" /> : <AccountBalanceIcon fontSize="large" />

  return (
    <MenuItem
      onClick={() => {
        props.togglePietRules();
        //handleClose();
      }}
    >
      <ListItemIcon>
        {icon}
      </ListItemIcon>
    </MenuItem>
  );
}

