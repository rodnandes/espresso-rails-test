import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from "./Sidebar";
import {Outlet} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import {useContext} from "react";
import {UserContext} from "./AppRouter";
import Avatar from "@mui/material/Avatar";

const drawerWidth = 240;

export default function Layout(props) {

  const { currentUser } = useContext(UserContext)

  function NameInitials() {
    const [firstName, lastName] = currentUser?.name?.split(' ') || [''];

    return lastName ? `${firstName[0]}${lastName[0]}` : firstName[0];
  }

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Espresso
          </Typography>
          <Avatar>{NameInitials()}</Avatar>
          <Box sx={{mx: 2}}>
            <Typography variant="body2">{currentUser.name}</Typography>
            <Typography variant="caption">{currentUser.email}</Typography>
          </Box>
          <IconButton size="medium" color="inherit" href='/users/sign_out' rel='nofollow' data-method='delete' >
            <LogoutIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar currentMenu={props.currentMenu} drawerWidth={drawerWidth}/>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <Toolbar/>
        {props.children || <Outlet/>}
      </Box>
    </Box>
  );
}
