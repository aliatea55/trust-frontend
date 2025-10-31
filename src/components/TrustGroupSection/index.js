import React from 'react';
import { 
  Box,
  Typography,
  Button,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
  Stack,
  Paper,
  Divider,
  IconButton
} from '@mui/material';
import {
  Facebook,
  LinkedIn,
  Twitter,
  Instagram,
  Phone,
  Email,
  LocationOn,
  ArrowForward,
  Shield,
  TrendingUp,
  HeadsetMic,
  EmojiEvents,
  CheckCircle
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';

// تأثيرات حركية
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const TrustHeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // إحصائيات الشركة
  const stats = [
    { value: '28+', label: 'سنوات الخبرة' },
    { value: '500K+', label: 'عميل راضي' },
    { value: '24/7', label: 'دعم فني' }
  ];

  // مميزات الخدمة
  const features = [
    { icon: <Shield color="primary" sx={{ fontSize: 40 }} />, title: 'حماية شاملة', description: 'تغطيات تأمينية واسعة لكل احتياجاتك' },
    { icon: <TrendingUp color="primary" sx={{ fontSize: 40 }} />, title: 'أسعار تنافسية', description: 'أفضل قيمة مقابل المال في السوق' },
    { icon: <HeadsetMic color="primary" sx={{ fontSize: 40 }} />, title: 'دعم فني متميز', description: 'فريق دعم على مدار الساعة' }
  ];

  return (
    <Box sx={{
      backgroundColor: theme.palette.background.default,
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* قسم الهيرو */}
      <Box sx={{
        backgroundImage: 'linear-gradient(rgba(0, 76, 153, 0.8), rgba(0, 76, 153, 0.9)), url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: 10,
        position: 'relative'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h3" sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  lineHeight: 1.2
                }}>
                  تأمينك الشامل مع <span style={{ color: '#FFD700' }}>ترست</span>
                </Typography>
                
                <Typography variant="h6" sx={{ mb: 3 }}>
                  نحمي مستقبلك منذ 1994 بخبرة تفوق 28 عامًا في مجال التأمين
                </Typography>
                
                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 4,
                      fontWeight: 'bold',
                      animation: `${pulseAnimation} 2s infinite`
                    }}
                  >
                    اطلب عرض سعر
                  </Button>
                  
         
                </Stack>
              </motion.div>
            </Grid>
            
            {!isMobile && (
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{
                    backgroundImage: 'url(/insurance-card.png)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: 400
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* قسم الإحصائيات */}
      <Box sx={{ py: 6, backgroundColor: '#f9f9f9' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper elevation={3} sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    height: '100%'
                  }}>
                    <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* قسم المميزات */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" sx={{ 
            fontWeight: 'bold',
            mb: 6,
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 4,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 2
            }
          }}>
            لماذا تختار ترست؟
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper elevation={4} sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 3,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[10]
                    }
                  }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 'bold',
                      mb: 2
                    }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1">
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* قسم الشركات التابعة */}
      <Box sx={{ py: 8, backgroundColor: '#f5f7fa' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" sx={{ 
            fontWeight: 'bold',
            mb: 6
          }}>
            شركات مجموعة ترست
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {[
              { name: 'ترست للتأمين', logo: '/trust-insurance.png' },
              { name: 'ترست العقارية', logo: '/trust-realestate.png' },
              { name: 'سمارت هيلث', logo: '/smart-health.png' },
              { name: 'ترست للسياحة', logo: '/trust-travel.png' }
            ].map((company, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper elevation={2} sx={{
                    p: 3,
                    height: 120,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2
                  }}>
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      style={{ maxWidth: '100%', maxHeight: 70 }}
                    />
                  </Paper>
                  <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                    {company.name}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* قسم التواصل */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Paper elevation={4} sx={{
            p: 4,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, #0066cc)`,
            color: 'white'
          }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold',
                  mb: 2
                }}>
                  مستعد لبدء رحلتك التأمينية؟
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  تواصل مع خبرائنا الآن للحصول على أفضل الحلول التأمينية
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={5}>
                <Stack direction="row" spacing={2} justifyContent={isMobile ? 'center' : 'flex-end'}>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 4,
                      fontWeight: 'bold'
                    }}
                  >
                    اتصل بنا
                  </Button>
                  
                  <Button 
                    variant="outlined" 
                    color="inherit" 
                    size="large"
                    sx={{
                      px: 4,
                      fontWeight: 'bold',
                      borderWidth: 2,
                      '&:hover': { borderWidth: 2 }
                    }}
                  >
                    طلب معاودة
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
          
          <Box sx={{ 
            mt: 6,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                تابعنا على وسائل التواصل الاجتماعي
              </Typography>
              <Stack direction="row" spacing={1}>
                {[
                  { icon: <Facebook />, color: '#3b5998' },
                  { icon: <Twitter />, color: '#1da1f2' },
                  { icon: <LinkedIn />, color: '#0077b5' },
                  { icon: <Instagram />, color: '#e1306c' }
                ].map((social, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      backgroundColor: social.color,
                      color: 'white',
                      '&:hover': { backgroundColor: social.color }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
            
            <Box sx={{ mt: isMobile ? 4 : 0 }}>
              <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ ml: 1 }} /> +970 599 123 456
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ ml: 1 }} /> info@trust.ps
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
      
      {/* حقوق النشر */}
      <Divider />
      <Box sx={{ py: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" color="text.secondary">
            © {new Date().getFullYear()} مجموعة ترست العالمية للتأمين. جميع الحقوق محفوظة.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default TrustHeroSection;