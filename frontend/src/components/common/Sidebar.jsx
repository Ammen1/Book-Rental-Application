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
  Notifications as NotificationsIcon,
  ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../../redux/slices/userSlice';
import Navbar from './Navbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EnhancedSidebar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSignout = async () => {
      localStorage.removeItem('token');
        navigate('/signin');
        dispatch(signoutSuccess());
      
    
  };
  

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon fontSize="14px" />, roles: ['ADMIN', 'OWNER'], path: '/dashboard' },
    { text: 'Books', icon: <BookIcon fontSize="14px" />, roles: ['ADMIN', "OWNER"], path: '/books' },
    { text: 'Owners', icon: <PersonIcon fontSize="10px" />, roles: ['ADMIN'], path: '/owners' },
    { text: 'Book Upload', icon: <BookIcon fontSize="10px" />, roles: ['OWNER'], path: '/upload-book' },
  ];

  const settingsItems = [
    { text: 'Notification', icon: <NotificationsIcon fontSize="10px" color="inherit"/>, roles: ['ADMIN', 'OWNER'], path: '/notification' },
    { text: 'Settings', icon: <SettingsIcon fontSize="10px" />, roles: ['ADMIN', 'OWNER'], path: '/settings' },
    { text: 'Login as Book Owner', icon: <ExitToAppIcon fontSize="10px" />, roles: ['ADMIN'], path: '/login-as-book-owner' },

  ];

  const getUserRole = () => {
    if (currentUser.user.role === 'ADMIN') return 'ADMIN';
    if (currentUser.user.role === 'OWNER') return 'OWNER';
    else {
      return 'USER';
    }
  };
  useEffect(() => {
    if (!currentUser) {
      navigate('/signin'); 
    }
  }, [currentUser, navigate]);

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
            fontSize: { xs: '1rem', sm: '1rem' },
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
                  fontSize: { xs: '0.5rem', sm: '1rem' },
                }}
              />
              {item.text === 'Dashboard' && (
                <Typography
                  variant="body2"
                  sx={{
                    ml: 2,
                    color: '#E2E8F0',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '0.7rem',
                  }}
                >
                  {currentUser.user.role}
                </Typography>
              )}
            </ListItem>
          ))}
      </List>
      <Divider sx={{ my: 2, borderColor: '#334155' }} />
      <List>
        {settingsItems
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
                  fontSize: { xs: '0.5rem', sm: '1rem' },
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
