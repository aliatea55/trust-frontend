import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
  Switch,
  FormControlLabel,
  Link,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Alert,
  Snackbar,
  Divider
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  DarkMode,
  LightMode,
  WhatsApp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import logo from '../../assets/logo.png';


export default function Login() {
  const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  // Load saved preferences
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  // Form validation
  const validate = () => {
    const errs = { email: '', password: '' };
    let isValid = true;

    if (!email.includes('@')) {
      errs.email = 'يرجى إدخال بريد إلكتروني صالح';
      isValid = false;
    }

    if (password.length < 6) {
      errs.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      isValid = false;
    }

    setError(errs);
    return isValid;
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await api.post('/users/login', { email, password });
      if (response.status === 200) {
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        
        if (remember) {
          localStorage.setItem("rememberedEmail", email);
        }

        if (!user.isProfileComplete) {
          navigate('/profile-setup');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response?.status === 401) {
        setError(prev => ({
          ...prev,
          password: "البريد الإلكتروني أو كلمة المرور غير صحيحة"
        }));
        setSnackbar({
          open: true,
          message: "بيانات الدخول غير صحيحة",
          severity: "error"
        });
      } else {
        setSnackbar({
          open: true,
          message: "حدث خطأ في الاتصال بالخادم",
          severity: "error"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const decoded = jwtDecode(credential);
      
      const response = await api.post('/users/google-login', {
        email: decoded.email,
        name: decoded.name,
        googleId: decoded.sub
      });

      if (response.status === 200) {
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        
        if (!user.isProfileComplete) {
          navigate('/profile-setup');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error("Google login error:", error);
      setSnackbar({
        open: true,
        message: "حدث خطأ أثناء تسجيل الدخول عبر Google",
        severity: "error"
      });
    }
  };

  const handleGoogleLoginError = () => {
    setSnackbar({
      open: true,
      message: "فشل تسجيل الدخول باستخدام Google",
      severity: "error"
    });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (

    
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'rtl',
        px: 2,
        background: darkMode 
          ? 'linear-gradient(135deg, #121212 0%, #424242 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        transition: 'background 0.3s ease'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 450,
            width: '100%',
            textAlign: 'center',
            borderTop: `5px solid ${theme.palette.primary.main}`,
            borderRadius: 3,
            bgcolor: darkMode ? 'background.paperDark' : 'background.paper',
            color: darkMode ? 'text.primaryDark' : 'text.primary',
            boxShadow: darkMode ? '0px 4px 20px rgba(0,0,0,0.5)' : '0px 4px 20px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>

          <Zoom in={true} style={{ transitionDelay: '100ms' }}>
            <Box>
              <img 
                src={logo} 
                alt="شعار ترست" 
                style={{ 
                  width: 100, 
                  marginBottom: 16,
                  filter: darkMode ? 'brightness(0.8)' : 'none'
                }} 
              />
            </Box>
          </Zoom>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            تسجيل الدخول
          </Typography>

          <form onSubmit={handleLogin}>
            <Fade in={true} style={{ transitionDelay: '200ms' }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                type="email"
                required
                variant="outlined"
                dir="ltr"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error.email}
                helperText={error.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: darkMode ? '#555' : '#ccc',
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  }
                }}
              />
            </Fade>

            <Fade in={true} style={{ transitionDelay: '300ms' }}>
              <TextField
                fullWidth
                label="كلمة المرور"
                type={showPw ? 'text' : 'password'}
                required
                variant="outlined"
                dir="ltr"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error.password}
                helperText={error.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        size="small" 
                        onClick={() => setShowPw(!showPw)}
                        edge="end"
                      >
                        {showPw ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: darkMode ? '#555' : '#ccc',
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  }
                }}
              />
            </Fade>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={remember} 
                    onChange={() => setRemember(!remember)} 
                    size="small" 
                    color="primary"
                  />
                }
                label="تذكرني"
                sx={{ m: 0 }}
              />
              
              <Link
                href="#"
                variant="body2"
                underline="hover"
                color="primary"
                onClick={() => navigate('/forgot-password')}
                sx={{ textDecoration: 'none' }}
              >
                هل نسيت كلمة المرور؟
              </Link>
            </Box>

            <Fade in={true} style={{ transitionDelay: '400ms' }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ 
                  py: 1.5, 
                  fontWeight: 'bold', 
                  mb: 2, 
                  position: 'relative',
                  mt: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ position: 'absolute', color: '#fff' }} />
                ) : (
                  'تسجيل الدخول'
                )}
              </Button>
            </Fade>
          </form>

          <Box sx={{ my: 2 }}>
            <Divider sx={{ color: darkMode ? '#555' : '#ddd' }}>
              <Typography variant="body2" color="textSecondary">
                أو
              </Typography>
            </Divider>
          </Box>

          <Fade in={true} style={{ transitionDelay: '500ms' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                shape="pill"
                theme={darkMode ? 'filled_blue' : 'outline'}
                text="signin_with"
                size="medium"
                locale="ar"
              />
            </Box>
          </Fade>

          <Fade in={true} style={{ transitionDelay: '600ms' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Typography variant="body2">
                ليس لديك حساب؟{' '}
                <Link 
                  href="#" 
                  color="primary" 
                  onClick={() => navigate('/signup')}
                  sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                >
                  سجل الآن
                </Link>
              </Typography>
            </Box>
          </Fade>
        </Paper>
      </motion.div>

      {/* WhatsApp Floating Button */}
      <Zoom in={true} style={{ transitionDelay: '700ms' }}>
        <Box
          component="a"
          href="https://wa.me/0599123456"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            bgcolor: '#25D366',
            color: '#fff',
            width: 56,
            height: 56,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 3,
            zIndex: 1000,
            '&:hover': {
              transform: 'scale(1.1)',
              bgcolor: '#128C7E'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <WhatsApp sx={{ fontSize: 28 }} />
        </Box>
      </Zoom>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
  
}