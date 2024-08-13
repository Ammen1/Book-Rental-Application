import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Book as BookIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../../redux/slices//userSlice';
import Navbar from './Navbar';


const EnhancedSidebar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.user.role)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/v1/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon fontSize="small" />, roles: ['ADMIN', 'OWNER'], path: '/dashboard' },
    { text: 'Books', icon: <BookIcon fontSize="small" />, roles: ['ADMIN', 'OWNER'], path: '/books' },
    { text: 'Owners', icon: <PersonIcon fontSize="small" />, roles: ['ADMIN'], path: '/owners' },
    { text: 'Book Upload', icon: <BookIcon fontSize="small" />, roles: ['ADMIN'], path: '/upload-book' },
    { text: 'Settings', icon: <SettingsIcon fontSize="small" />, roles: ['ADMIN', 'OWNER'], path: '/settings' },
  ];

  const getUserRole = () => {
    if (currentUser.user.role === 'ADMIN') return 'ADMIN';
    if (currentUser.user.role === 'OWNER') return 'OWNER';

  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        {isSmallScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: '#E2E8F0' }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        )}
        <img
          src="Group 1.png"
          alt="Book Rent Logo"
          style={{
            width: '40px',
            height: 'auto',
            marginRight: '12px',
          }}
        />
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: '#00ABFF',
            fontWeight: 'bold',
            fontFamily: 'Roboto, sans-serif',
            fontSize: { xs: '1.05rem', sm: '1.05rem' },
          }}
        >
          Book Rent
        </Typography>
      </Box>
      <Divider sx={{ mb: 2, borderColor: '#334155' }} />
      <List>
   {menuItems
     .filter((item) => item.roles.includes(getUserRole()))
     .map((item, index) => (
       <ListItem
         button
         key={index}
         component={Link}
         to={item.path} 
         selected={location.pathname === item.path} 
         sx={{
           mb: 1,
           borderRadius: 1,
           '&.Mui-selected': {
             backgroundColor: '#3B82F6',
             color: '#FFF',
           },
           '&:hover': {
             backgroundColor: '#3B82F6',
             color: '#FFF',
           },
         }}
       >
         <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
           {item.icon}
         </ListItemIcon>
         <ListItemText
           primary={item.text}
           sx={{
             color: 'inherit',
             fontFamily: 'Roboto, sans-serif',
             fontSize: { xs: '0.875rem', sm: '1rem' },
           }}
         />
       </ListItem>
     ))}
 </List>
      {!isSmallScreen && (
        <Box sx={{ mt: 'auto', mb: 2, p: 2 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            fullWidth
            onClick={handleSignout}
            sx={{
              backgroundColor: '#FFFFFF33',
              '&:hover': {
                backgroundColor: '#FFFFFF33',
              },
              fontFamily: 'Roboto, sans-serif',
              fontSize: { xs: '0.5rem', sm: '0.85rem' },
              padding: { xs: '4px', sm: '6px' },
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
        <Navbar />
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isSmallScreen ? drawerOpen : true}
        onClose={toggleDrawer}
        sx={{
          width: { xs: 0, sm: 230, md: 260 },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: { xs: 230, sm: 230, md: 260 },
            boxSizing: 'border-box',
            backgroundColor: '#171B36',
            color: '#E2E8F0',
            border: 'none',
            padding: 2,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      {isSmallScreen && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1200,
            backgroundColor: '#171B36',
            '&:hover': {
              backgroundColor: '#3B82F6',
            },
            color: '#E2E8F0',
          }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
      )}
    </>
  );
};

export default EnhancedSidebar;
