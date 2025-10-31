import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Container,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material';
import {
  ExitToApp,
  People,
  Person,
  Settings,
  Dashboard as DashboardIcon,
  Notifications,
  Menu,
  Business,
  Assignment,
  MonetizationOn,
  Security,
  Help,
  ContactSupport,
  Star,
  CheckCircle,
  BarChart,
  Event,
  Group,
  Description
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import StatCard from './StatCard';
import RecentActivities from './RecentActivities';
import QuickActions from './QuickActions';
import { CircularProgress } from '@mui/material';
import { LineChart } from '@mui/x-charts';


import './i18n'; // استدعاء التهيئة

export default function Dashboard() {
  <Box my={3}>
  <Typography variant="h6">إحصائيات المستخدمين</Typography>
  <LineChart
    series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
    height={300}
  />
</Box>
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [notificationsCount, setNotificationsCount] = useState(3);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate('/login');
    } else {
      setUser(userData);
      setIsAdmin(userData.email === 'ali.admin@trust.com');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  // ===============================================
  // واجهة المستخدم العادي
  // ===============================================
  const UserDashboard = () => (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            مرحبًا بك في نظام ترست
          </Typography>
          <Typography variant="h5" color="text.secondary">
            نحن هنا لمساعدتك في تحقيق أهدافك
          </Typography>
        </Box>

        {/* خدمات الشركة */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <Star color="primary" sx={{ mr: 2 }} />
            خدماتنا المميزة
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[8]
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Business color="primary" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    حلول الأعمال
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    نقدم حلولاً متكاملة لتحسين أداء عملك وزيادة أرباحك من خلال أحدث التقنيات.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[8]
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <MonetizationOn color="primary" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    الاستشارات المالية
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    فريق من الخبراء الماليين لمساعدتك في اتخاذ القرارات المالية الصحيحة.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[8]
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Security color="primary" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    الأمن والحماية
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    نضمن لك أعلى معايير الأمان والحماية لبياناتك وخصوصيتك.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* إحصائيات المستخدم */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <BarChart color="primary" sx={{ mr: 2 }} />
            نشاطك معنا
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="المهام المكتملة"
                value="24"
                icon={<CheckCircle />}
                color={theme.palette.success.main}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="المشاريع النشطة"
                value="3"
                icon={<Assignment />}
                color={theme.palette.info.main}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="الرسائل غير المقروءة"
                value="5"
                icon={<Notifications />}
                color={theme.palette.warning.main}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="أيام العضوية"
                value="128"
                icon={<Event />}
                color={theme.palette.primary.main}
              />
            </Grid>
          </Grid>
        </Box>

        {/* إجراءات سريعة */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <Description color="primary" sx={{ mr: 2 }} />
            إجراءات سريعة
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Button 
                fullWidth 
                variant="contained" 
                size="large"
                startIcon={<ContactSupport />}
                sx={{ py: 2, borderRadius: 2 }}
              >
                تقديم طلب دعم
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button 
                fullWidth 
                variant="outlined" 
                size="large"
                startIcon={<Help />}
                sx={{ py: 2, borderRadius: 2 }}
              >
                مركز المساعدة
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button 
                fullWidth 
                variant="contained" 
                color="secondary"
                size="large"
                startIcon={<Person />}
                sx={{ py: 2, borderRadius: 2 }}
                onClick={() => navigate('/profile')}
              >
                تحديث الملف الشخصي
              </Button>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );

  // ===============================================
  // واجهة المدير
  // ===============================================
  {/* واجهة المدير */}
const AdminDashboard = () => (
  <Box sx={{ 
    p: { xs: 2, sm: 3 },
    maxWidth: '100%',
    overflowX: 'hidden'
  }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        لوحة التحكم الإدارية
      </Typography>

      {/* بطاقات الإحصائيات */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="إجمالي المستخدمين"
            value="1,245"
            icon={<People />}
            color={theme.palette.primary.main}
            trend="up"
            trendValue="12%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="المستخدمين النشطين"
            value="892"
            icon={<Person />}
            color={theme.palette.success.main}
            trend="up"
            trendValue="5%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="طلبات هذا الشهر"
            value="326"
            icon={<Notifications />}
            color={theme.palette.warning.main}
            trend="down"
            trendValue="3%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="المهام المكتملة"
            value="76%"
            icon={<CheckCircle />}
            color={theme.palette.info.main}
            trend="up"
            trendValue="8%"
          />
        </Grid>
      </Grid>

      {/* منطقة المحتوى الرئيسية */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ 
            height: '100%', 
            boxShadow: theme.shadows[4],
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 2,
                flexWrap: 'wrap',
                gap: 1
              }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  النشاطات الحديثة
                </Typography>
                <Chip 
                  label="اليوم" 
                  color="primary" 
                  size="small" 
                  sx={{ 
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }} 
                />
              </Box>
              <RecentActivities />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Card sx={{ 
            height: '100%', 
            boxShadow: theme.shadows[4],
            borderRadius: '12px',
            mb: { xs: 2, sm: 3 }
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.1rem' }}>
                إجراءات إدارية سريعة
              </Typography>
              <QuickActions isAdmin={isAdmin} />
            </CardContent>
          </Card>
          
          <Card sx={{ 
            boxShadow: theme.shadows[4],
            borderRadius: '12px'
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.1rem' }}>
                ملخص النظام
              </Typography>
              <List sx={{ py: 0 }}>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <Group color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography fontWeight="medium">المستخدمون الجدد</Typography>} 
                    secondary="12 مستخدم هذا الأسبوع" 
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <Assignment color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography fontWeight="medium">المهام المعلقة</Typography>} 
                    secondary="8 مهام تحتاج مراجعة" 
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <Notifications color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography fontWeight="medium">الإشعارات</Typography>} 
                    secondary="3 إشعارات غير مقروءة" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  </Box>
);

  // ===============================================
  // القائمة الجانبية
  // ===============================================
  const SidebarContent = () => (
    <Paper sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
    }}>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          نظام ترست
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {isAdmin ? 'لوحة التحكم الإدارية' : 'لوحة تحكم المستخدم'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
     <Avatar 
  src={user.profileImageUrl ? `https://localhost:5203${user.profileImageUrl}` : undefined}
  sx={{ width: 40, height: 40 }}
>
  {user.fullName?.charAt(0)}
</Avatar>

        <Typography variant="subtitle1" fontWeight="medium">
          {user.fullName}
        </Typography>
        <Chip 
          label={isAdmin ? 'مدير النظام' : 'مستخدم'} 
          size="small" 
          sx={{ 
            mt: 1,
            bgcolor: isAdmin ? theme.palette.error.dark : theme.palette.success.dark,
            color: 'white'
          }} 
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 1 }} />

      <Box sx={{ flexGrow: 1, p: 2 }}>
        <List>
          <ListItem 
            button 
            selected 
            sx={{ 
              borderRadius: 2,
              mb: 1,
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.15)'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="لوحة التحكم" />
          </ListItem>
          
          <ListItem 
            button 
            sx={{ 
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.15)'
              }
            }}
            onClick={() => navigate('/profile')}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <Person />
            </ListItemIcon>
            <ListItemText primary="الملف الشخصي" />
          </ListItem>
          
          {isAdmin && (
            <ListItem 
              button 
              sx={{ 
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.15)'
                }
              }}
              onClick={() => navigate('/users')}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <People />
              </ListItemIcon>
              <ListItemText primary="إدارة المستخدمين" />
            </ListItem>
          )}
          
          <ListItem 
            button 
            sx={{ 
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.15)'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="الإعدادات" />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 1 }} />

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          startIcon={<ExitToApp />}
          sx={{ 
            justifyContent: 'flex-start',
            color: 'inherit',
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
          onClick={handleLogout}
        >
          تسجيل الخروج
        </Button>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          width: 280,
          flexShrink: 0,
          position: isMobile ? 'fixed' : 'relative',
          zIndex: 1200,
          height: '100vh',
          boxShadow: theme.shadows[10]
        }}
      >
        <SidebarContent />
      </motion.div>

      {/* Main Content */}
      <Box sx={{ 
        flexGrow: 1,
        ml: isMobile ? 0 : `${sidebarOpen ? 280 : 0}px`,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}>
        {/* App Bar */}
        <Paper elevation={0} sx={{ 
          display: 'flex',
          alignItems: 'center',
          p: 2,
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: 'sticky',
          top: 0,
          zIndex: 1100
        }}>
          <IconButton 
            onClick={toggleSidebar} 
            sx={{ 
              mr: 2,
              color: theme.palette.primary.main
            }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {isAdmin ? 'لوحة التحكم الإدارية' : 'لوحة تحكم المستخدم'}
          </Typography>
          <Tooltip title="الإشعارات">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={notificationsCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar 
  src={user.profileImageUrl ? `https://localhost:5203${user.profileImageUrl}` : undefined}
  sx={{ width: 40, height: 40 }}
>
  {user.fullName?.charAt(0)}
</Avatar>
        </Paper>

        {/* Render the appropriate dashboard based on user role */}
        {isAdmin ? <AdminDashboard /> : <UserDashboard />}
      </Box>
    </Box>
  );
}  