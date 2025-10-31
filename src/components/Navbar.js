import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/logo';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const navItems = [
    { text: 'الرئيسية', path: '/' },
    { text: 'من نحن', path: '/about' },
    { text: 'خدماتنا', path: '/services' },
    { text: 'فروعنا', path: '/branches' },
    { text: 'اتصل بنا', path: '/contact' }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        bgcolor: '#004C99',
        height: '100%',
        color: 'white',
        direction: 'rtl'
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                textAlign: 'right',
                fontWeight: 'bold'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ bgcolor: '#004C99' }}>
      <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
        <Logo />

        {/* لسطح المكتب */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 1,
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {item.text}
              </Button>
            ))}

            {/* صورة الملف الشخصي */}
            {user && user.profileImageUrl && (
              <Tooltip title="الملف الشخصي">
                <IconButton onClick={() => navigate('/profile')}>
                  <Avatar 
  src={user.profileImageUrl ? `https://localhost:5203${user.profileImageUrl}` : undefined}
  sx={{ width: 40, height: 40 }}
>
  {user.fullName?.charAt(0)}
</Avatar>

                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}

        {/* للجوال */}
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user && user.profileImageUrl && (
              <Tooltip title="الملف الشخصي">
                <IconButton onClick={() => navigate('/profile')}>
                  <Avatar
                    alt={user.fullName}

                  />
                </IconButton>
              </Tooltip>
            )}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* القائمة المنزلقة للجوال */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 250,
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </AppBar>
  );
};

export default Navbar;
