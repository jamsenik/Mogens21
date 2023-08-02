import * as React from "react";
import {
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import preval from "preval.macro";


export default function Clear() {


  return (
    <div>
      <MenuItem onClick={() => info()}>
        <ListItemIcon>
          <InfoIcon fontSize="large" />
        </ListItemIcon>
      </MenuItem>
    </div>
  );
}

function info(): void {
  const buildTimestamp = preval`module.exports = new Date().toLocaleString();`;
  window.alert("Yatzy\n\n" + buildTimestamp + "\n\n");
}
