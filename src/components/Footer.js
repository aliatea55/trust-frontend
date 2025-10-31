import React from "react";
import { 
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
  Button,
  Container,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { 
  FaFacebookF, 
  FaLinkedinIn, 
  FaTwitter, 
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaDownload
} from "react-icons/fa";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(2),
  direction: "rtl",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
  }
}));

const SocialIcon = styled(motion.a)(({ theme, bgcolor }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: bgcolor,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  boxShadow: theme.shadows[2],
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: theme.shadows[4]
  }
}));

const FooterLink = styled(motion(Link))(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0.5, 0),
  transition: "all 0.3s ease",
  "&:hover": {
    color: theme.palette.primary.main,
    paddingRight: theme.spacing(1)
  }
}));

const FooterButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  fontWeight: 600,
  padding: theme.spacing(1, 2),
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "0.875rem",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4]
  },
  margin: theme.spacing(0.5, 1, 0.5, 0)
}));

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // بيانات الروابط الاجتماعية
  const socialLinks = [
    { 
      icon: <FaFacebookF size={16} />, 
      url: "https://facebook.com/trustinsurance", 
      color: "#3b5998", 
      label: "Facebook" 
    },
    { 
      icon: <FaLinkedinIn size={16} />, 
      url: "https://linkedin.com/company/trustinsurance", 
      color: "#0077b5", 
      label: "LinkedIn" 
    },
    { 
      icon: <FaTwitter size={16} />, 
      url: "https://twitter.com/trustinsurance", 
      color: "#1da1f2", 
      label: "Twitter" 
    },
    { 
      icon: <FaInstagram size={16} />, 
      url: "https://instagram.com/trustinsurance", 
      color: "#e1306c", 
      label: "Instagram" 
    }
  ];

  // معلومات الاتصال
  const contactInfo = [
    { 
      icon: <FaPhoneAlt />, 
      text: "+970 599 123 456", 
      url: "tel:+970599123456" 
    },
    { 
      icon: <FaEnvelope />, 
      text: "info@trust.com", 
      url: "mailto:info@trust.com" 
    },
    { 
      icon: <FaMapMarkerAlt />, 
      text: "رام الله - فلسطين", 
      url: "https://goo.gl/maps/example" 
    }
  ];

  // روابط سريعة
  const quickLinks = [
    { text: "الرئيسية", url: "/" },
    { text: "عن الشركة", url: "/about" },
    { text: "خدماتنا", url: "/services" },
    { text: "الفروع", url: "/branches" },
    { text: "الوظائف", url: "/careers" },
    { text: "اتصل بنا", url: "/contact" }
  ];

  // روابط إضافية
  const legalLinks = [
    { text: "الشروط والأحكام", url: "/terms" },
    { text: "سياسة الخصوصية", url: "/privacy" },
    { text: "المستندات القانونية", url: "/legal" },
    { text: "الأسئلة الشائعة", url: "/faq" }
  ];

  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* قسم الشعار والمعلومات */}
          <Grid item xs={12} md={4}>
            <Box 
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  color: theme.palette.primary.main,
                  mb: 2,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Box 
                  component="span"
                  sx={{
                    width: 8,
                    height: 24,
                    backgroundColor: theme.palette.secondary.main,
                    marginLeft: 1,
                    borderRadius: 1
                  }}
                />
                مجموعة ترست العالمية
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  mb: 3,
                  lineHeight: 1.8
                }}
              >
                شركة رائدة في مجال التأمين بمختلف أنواعه، نقدم حلولاً مبتكرة لعملائنا في 17 دولة حول العالم منذ عام 1994.
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <FooterButton
                  variant="contained"
                  startIcon={<FaDownload />}
                  href="/downloads"
                >
                  تحميل التطبيق
                </FooterButton>
                <FooterButton
                  variant="contained"
                  startIcon={<FaGlobe />}
                  href="/global"
                >
                  مواقع عالمية
                </FooterButton>
              </Box>
              
              <Box sx={{ display: "flex", gap: 1.5 }}>
                {socialLinks.map((social, index) => (
                  <SocialIcon
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    bgcolor={social.color}
                    aria-label={social.label}
                    whileHover={{ y: -3 }}
                  >
                    {social.icon}
                  </SocialIcon>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* قسم الروابط السريعة */}
          <Grid item xs={12} sm={6} md={4}>
            <Box 
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: theme.palette.text.primary,
                  mb: 2,
                  fontWeight: 600,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    right: 0,
                    width: 40,
                    height: 3,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 2
                  }
                }}
              >
                روابط سريعة
              </Typography>
              
              <List dense disablePadding>
                {quickLinks.map((link, index) => (
                  <ListItem key={index} disableGutters disablePadding>
                    <FooterLink
                      href={link.url}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Box 
                        component="span"
                        sx={{
                          width: 6,
                          height: 6,
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: "50%",
                          marginLeft: 1,
                          opacity: 0,
                          transition: "opacity 0.3s ease"
                        }}
                      />
                      {link.text}
                    </FooterLink>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/* قسم معلومات الاتصال */}
          <Grid item xs={12} sm={6} md={4}>
            <Box 
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: theme.palette.text.primary,
                  mb: 2,
                  fontWeight: 600,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    right: 0,
                    width: 40,
                    height: 3,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 2
                  }
                }}
              >
                تواصل معنا
              </Typography>
              
              <List dense disablePadding>
                {contactInfo.map((item, index) => (
                  <ListItem key={index} disableGutters disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ 
                      minWidth: 30, 
                      color: theme.palette.primary.main 
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    <FooterLink
                      href={item.url}
                      target="_blank"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.text}
                    </FooterLink>
                  </ListItem>
                ))}
              </List>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  color: theme.palette.text.primary,
                  mt: 3,
                  mb: 2,
                  fontWeight: 600,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    right: 0,
                    width: 40,
                    height: 3,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 2
                  }
                }}
              >
                روابط قانونية
              </Typography>
              
              <List dense disablePadding>
                {legalLinks.map((link, index) => (
                  <ListItem key={index} disableGutters disablePadding>
                    <FooterLink
                      href={link.url}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Box 
                        component="span"
                        sx={{
                          width: 6,
                          height: 6,
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: "50%",
                          marginLeft: 1,
                          opacity: 0,
                          transition: "opacity 0.3s ease"
                        }}
                      />
                      {link.text}
                    </FooterLink>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
        
        {/* حقوق النشر */}
        <Divider sx={{ 
          my: 4,
          borderColor: theme.palette.divider
        }} />
        
        <Box 
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{ 
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary,
              mb: isMobile ? 1 : 0
            }}
          >
            © {new Date().getFullYear()} مجموعة ترست العالمية. جميع الحقوق محفوظة.
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary
            }}
          >
            مصمم ومطور بواسطة <Link 
              href="https://trust.com" 
              color="primary"
              sx={{ 
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline"
                }
              }}
            >
              Eng.Ali Ibrahim Ali Atea
            </Link>
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
}

export default React.memo(Footer);