// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 230,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 230,
          boxSizing: 'border-box',
          backgroundColor: '#0a4f98',
          color: 'white',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem>
            <ListItemText primary="Book Rent" sx={{ textAlign: 'center', color: '#fff' }} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BookIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Books" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Owners" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <Box sx={{ mt: 'auto', mb: 2, p: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LogoutIcon />}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
