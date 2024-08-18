import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box,  Fade, Paper } from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/upload-book');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#240658',
        padding: 4,
        animation: `${fadeIn} 1s ease-in-out`,
      }}
    >
      <Fade in={true} timeout={1000}>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: '#ffffff',
            maxWidth: 400,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <img
            src='Frame.png'
            alt="Success"
            style={{ width: '60%', height: 'auto', borderRadius: '12px', marginBottom: '20px' }}
          />
        </Paper>
      </Fade>
    </Box>
  );
};

export default SuccessPage;
