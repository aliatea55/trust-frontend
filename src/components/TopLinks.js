import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import { Phone, Email, Login } from '@mui/icons-material';

function TopLinks() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hovered, setHovered] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;
  const navigate = useNavigate();
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);
  formData.append("userId", user.id);

  try {
    const response = await fetch("https://localhost:5203/api/Users/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    const updatedUser = { ...user, profileImageUrl: data.profileImageUrl };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.location.reload();
  } catch (err) {
    alert("فشل رفع الصورة");
  }
};

  return (
    <Box
      sx={{
        bgcolor: 'white',
        color: theme.palette.text.primary,
        px: 3,
        py: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        direction: 'rtl',
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1]
      }}
    >
      {/* معلومات التواصل */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Email fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          info@trust.com
        </Typography>

        <Divider orientation="vertical" flexItem sx={{ mx: 2, height: 20 }} />

        <Phone fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          0593075744
        </Typography>
      </Box>

      {/* روابط الحساب */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
       {user && (
  <Tooltip title="تغيير الصورة">
    <IconButton component="label" sx={{ ml: 1 }}>


      <input
        type="file"
        hidden
        accept="image/*"
        onChange={handleImageUpload}
      />
    </IconButton>
  </Tooltip>
)}


        {/* زر تسجيل الدخول أو الخروج */}
        {isLoggedIn ? (
          <Button
            variant="text"
            size="small"
            startIcon={<Login fontSize="small" sx={{ ml: 0.5 }} />}
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            sx={{
              color: hovered === 'logout' ? theme.palette.error.main : theme.palette.text.secondary,
              fontWeight: 500,
              transition: 'color 0.3s ease',
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: theme.palette.grey[300],
              },
            }}
            onMouseEnter={() => setHovered('logout')}
            onMouseLeave={() => setHovered(null)}
          >
            تسجيل الخروج
          </Button>
        ) : (
          <Button
            variant="text"
            size="small"
            startIcon={<Login fontSize="small" sx={{ ml: 0.5 }} />}
            component={RouterLink}
            to="/login"
            sx={{
              color: hovered === 'login' ? theme.palette.primary.main : theme.palette.text.secondary,
              fontWeight: 500,
              transition: 'color 0.3s ease',
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: theme.palette.grey[300],
              },
            }}
            onMouseEnter={() => setHovered('login')}
            onMouseLeave={() => setHovered(null)}
          >
            تسجيل الدخول
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default TopLinks;
