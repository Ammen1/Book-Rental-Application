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
        bgcolor: '#fff',
        width: '1143px',
        borderRadius: '4px',
        mt: 0,
        height: '60px',
        marginLeft: '0',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '60px',
          px: isSmallScreen ? 1 : 2,
          maxWidth: '1143px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
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
            color: '#000',
            fontWeight: 300,
            fontSize: isSmallScreen ? '0.75rem' : '1rem',
            lineHeight: '24px',
            flexGrow: 1, // Allow Typography to take up available space
            textAlign: 'left', // Align text to the left
            ml: isSmallScreen ? 0 : 2, // Add margin-left if not small screen
          }}
        >
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
