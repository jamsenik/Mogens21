import * as React from "react";
import {
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import preval from "preval.macro";

interface Props {
  currentGroup: string;
}

export default function Info(props: Props) {


  return (
    <div>
      <MenuItem onClick={() => info(props.currentGroup)}>
        <ListItemIcon>
          <InfoIcon fontSize="large" />
        </ListItemIcon>
      </MenuItem>
    </div>
  );
}

function info(groupname: string): void {
  const buildTimestamp = preval`module.exports = new Date().toLocaleString();`;
  window.alert("Yatzy\n\nGroup: " + groupname +"\nBuild: " + buildTimestamp + "\n\n" );
}
