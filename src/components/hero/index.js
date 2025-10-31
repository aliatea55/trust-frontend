import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { heroStyles } from './styles';
import backgroundImage from '../../../assets/bg-home.jpg';

const Hero = () => {
  return (
    <Box sx={heroStyles.container}>
      <Typography variant="h2" sx={heroStyles.title}>
        ترست للتأمين
      </Typography>
      <Typography variant="h5" sx={heroStyles.subtitle}>
        نحمي مستقبلك منذ 1994
      </Typography>
      <Button 
        variant="contained" 
        size="large"
        sx={heroStyles.button}
      >
        تعرف علينا
      </Button>
    </Box>
  );
};

export default Hero;