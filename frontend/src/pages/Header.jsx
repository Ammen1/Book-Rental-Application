import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, TextField, InputAdornment, IconButton, Menu, MenuItem, Avatar, Tooltip, Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Header = ({ handleMenuItemClick, handleUserMenuItemClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const userMenuOpen = Boolean(userMenuAnchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#fff', borderBottom: '1px solid #ddd' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: '#000' }}>
          Book Rental
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <TextField
            placeholder="Search Books"
            variant="outlined"
            size="small"
            sx={{ width: { xs: '100%', sm: '300px' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon sx={{ color: '#000' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <Tooltip title="Notifications">
            <IconButton edge="end" color="inherit">
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon sx={{ color: '#000', border: '1px solid #ddd', borderRadius: '50%', bgcolor: 'transparent' }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Favorites">
            <IconButton edge="end" color="inherit" sx={{ ml: 2 }}>
              <Badge badgeContent={10} color="error">
                <FavoriteIcon sx={{ color: '#000', border: '1px solid #ddd', borderRadius: '50%', bgcolor: 'transparent' }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="More Options">
            <IconButton
              edge="end"
              aria-label="more"
              aria-controls="basic-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              sx={{ ml: 2 }}
            >
              <MoreVertIcon sx={{ color: '#000', border: '1px solid #ddd', borderRadius: '50%', bgcolor: 'transparent' }} />
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuItemClick('/signin')}>Sign In</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/signup')}>Sign Up</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/books')}>Browse Books</MenuItem>
          </Menu>
          <Tooltip title="User Menu">
            <IconButton
              edge="end"
              aria-label="user-menu"
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleUserMenuOpen}
              sx={{ ml: 2 }}
            >
              <Avatar alt="User" src="/path-to-user-avatar.jpg">
                <PersonIcon sx={{ color: '#000' }} />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="user-menu"
            anchorEl={userMenuAnchorEl}
            open={userMenuOpen}
            onClose={handleUserMenuClose}
          >
            <MenuItem onClick={() => handleUserMenuItemClick('/profile')}>Profile</MenuItem>
            <MenuItem onClick={() => handleUserMenuItemClick('/settings')}>Settings</MenuItem>
            <MenuItem onClick={() => handleUserMenuItemClick('/logout')}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Header);
