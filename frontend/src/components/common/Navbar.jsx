import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentUser } = useSelector((state) => state.user);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        width: '100%',
        mr: 2,
        ml: 20,
        borderRadius: '5px', // Small border radius
      }}
    >
      <Toolbar
        sx={{
          justifyContent: isSmallScreen ? 'space-between' : 'flex-start',
          minHeight: '67px', 
          px: isSmallScreen ? 1 : 2, 
          maxWidth: '1143px',
          margin: '0 auto', 
          borderRadius: '5px', // Small border radius
        }}
      >
        {isSmallScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }} 
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: isSmallScreen ? 1 : 0,
            color: '#000',
            fontWeight: 500,
            textAlign: isSmallScreen ? 'start' : 'left',
            fontSize: isSmallScreen ? '0.75rem' : '1rem', // Smaller font size
          }}
        >
         {currentUser.user.role}/ Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
