// components/Header.js
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', color: '#333', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Dashboard</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: '#1976d2' }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
          <Typography sx={{ marginLeft: 1 }}>Admin</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
