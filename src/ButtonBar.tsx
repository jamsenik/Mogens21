import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import BackspaceIcon from "@mui/icons-material/Backspace";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import { ButtonGroup, ListItemIcon } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Clear from "./Clear";
import GroupName from "./GroupName";
import Info from "./Info";
import RuleSet from "./RuleSet";

const size = "min(6vw, 1cm)";
const screenfull = require("screenfull");

export function ButtonBar(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // enabling fullscreen has to be done after some user input
  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  return (
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0 }}
      >
        <Toolbar disableGutters={true}>
          <Box sx={{ flexGrow: 1 }} />
          <ButtonGroup variant="text" size="small">
            {Dice(1, props)}
            {Dice(2, props)}
            {Dice(3, props)}
            {Dice(4, props)}
            {Dice(5, props)}
            {Dice(6, props)}
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => props.scratch()}
            >
              <ClearIcon style={{ fontSize: size }} />
            </IconButton>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => props.backspace()}
            >
              <BackspaceIcon style={{ fontSize: size }} />
            </IconButton>
            <IconButton color="inherit" edge="start" onClick={handleClick}>
              <MenuIcon style={{ fontSize: size }} />
            </IconButton>
          </ButtonGroup>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <GroupName
              setGroup={(gn) => {
                props.setGroup(gn);
                handleClose();
              }}
              currentGroup={props.groupName}
            />
            <Clear
              clear={() => {
                props.clear();
                handleClose();
              }}
            />
            <MenuItem
              onClick={() => {
                toggleFullScreen();
                handleClose();
              }}
            >
              <ListItemIcon>
                <FullscreenIcon fontSize="large" />
              </ListItemIcon>
            </MenuItem>
            <RuleSet pietRules={props.pietRules} togglePietRules={() => props.togglePietRules()}/>
            <Info currentGroup={props.groupName}/>
          </Menu>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
  );
}

function Dice(i: number, props: Props) {
  return (
    <Button
      variant="contained"
      sx={{ fontSize: size, fontFamily: "Mogens Dice" }}
      onClick={() => props.diceClick(i)}
      disabled={!props.diceEnabled(i)}
      size="small"
    >
      {i}
    </Button>
  );
}

interface Props {
  diceClick: (i: number) => void;
  diceEnabled: (i: number) => boolean;
  backspace: () => void;
  scratch: () => void;
  clear: () => void;
  setGroup: (name: string) => void;
  groupName: string;
  togglePietRules: () => void;
  pietRules: boolean;
}
