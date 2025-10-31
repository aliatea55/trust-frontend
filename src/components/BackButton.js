import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ position = 'absolute', top = 16, right = 16 }) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      startIcon={<ArrowBackIcon />}
      sx={{
        position,
        top,
        right,
        zIndex: 10,
        bgcolor: 'white',
        color: 'black',
        border: '1px solid #ccc',
        '&:hover': {
          bgcolor: '#f0f0f0',
        },
      }}
    >
      رجوع
    </Button>
  );
};

export default BackButton;
