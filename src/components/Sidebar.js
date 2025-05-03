// components/Sidebar.js
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#1e1e2f',
          color: 'white',
        },
      }}
    >
      <Typography variant="h6" sx={{ padding: 2 }}>
        Admin Panel
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/products"
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: '#2d2d44',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
