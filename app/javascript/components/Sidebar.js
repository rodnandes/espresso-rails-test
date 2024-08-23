import * as React from "react";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import CategoryIcon from "@mui/icons-material/Category";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import {Link} from "react-router-dom";

export default function Sidebar ({ currentMenu, drawerWidth }) {

  const ListItems = () => {

    const MENU_ITEMS = {
      'despesas': { text: 'Despesas', icon: <ReceiptIcon /> },
      'funcionarios': { text: 'Funcionários', icon: <PersonIcon /> },
      'cartoes': { text: 'Cartões', icon: <CreditCardIcon /> },
      'categorias': { text: 'Categorias', icon: <CategoryIcon /> }
    }

    return <List>
      {Object.keys(MENU_ITEMS).map((itemKey) => (
        <ListItem key={itemKey} disablePadding>
          <ListItemButton selected={itemKey === currentMenu} component={Link} to={`/${itemKey}`}>
            <ListItemIcon>
              {MENU_ITEMS[itemKey].icon}
            </ListItemIcon>
            <ListItemText primary={MENU_ITEMS[itemKey].text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  }

  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <ListItems />
        </Box>
      </Drawer>
    </React.Fragment>
  )
}

