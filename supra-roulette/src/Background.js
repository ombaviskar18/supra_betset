import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const Background = ({ children }) => {
  return (
    <Box
      component={motion.div}
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A1929 0%, #1A2C42 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/grid.svg")',
          opacity: 0.1,
          zIndex: 1
        }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Background; 