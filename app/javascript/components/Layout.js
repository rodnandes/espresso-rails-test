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

const drawerWidth = 240;

export default function Layout(props) {
  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Espresso
          </Typography>
          <IconButton color="inherit" href='/users/sign_out' rel='nofollow' data-method='delete' >
            <LogoutIcon />
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
