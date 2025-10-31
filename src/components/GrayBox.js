import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaHandHoldingUsd,
  FaChartLine,
  FaUserTie
} from "react-icons/fa";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Container,
  Chip,
  useTheme,
  useMediaQuery
} from "@mui/material";

const FeatureCard = styled(motion.div)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "12px",
  padding: "20px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  height: "100%",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    borderColor: theme.palette.primary.main
  }
}));

const StatBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  backgroundColor: "rgba(0, 102, 204, 0.1)",
  borderRadius: "8px",
  padding: theme.spacing(2),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(0, 102, 204, 0.2)"
  }
}));

const SocialIcon = styled(motion.a)(({ theme }) => ({
  color: "#f0f0f0",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: theme.shadows[4]
  }
}));

const FooterLink = styled(motion.div)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  color: "#f0f0f0",
  textDecoration: "none",
  padding: theme.spacing(1, 0),
  transition: "all 0.3s ease",
  "&:hover": {
    color: theme.palette.primary.light,
    paddingRight: theme.spacing(1)
  }
}));

function GrayBox() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const companyInfo = {
    description: "مجموعة ترست العالمية للتأمين هي الرائدة في قطاع التأمين في فلسطين منذ عام 1994، تقدم حلول تأمينية مبتكرة وخدمات متميزة تغطي كافة احتياجات العملاء.",
    stats: [
      { value: "28+", label: "سنوات من الخبرة" },
      { value: "500K+", label: "عميل واثق بنا" },
      { value: "24/7", label: "خدمة عملاء" }
    ],
    features: [
      {
        icon: <FaShieldAlt size={24} />,
        title: "حماية شاملة",
        description: "خطط تأمين مصممة خصيصًا لتغطية جميع احتياجاتك"
      },
      {
        icon: <FaHandHoldingUsd size={24} />,
        title: "تعويضات سريعة",
        description: "نظام تعويضات سريع وفعال عند الحاجة"
      },
      {
        icon: <FaChartLine size={24} />,
        title: "استثمار آمن",
        description: "حلول استثمارية تأمينية ذات عوائد مضمونة"
      },
      {
        icon: <FaUserTie size={24} />,
        title: "استشارات متخصصة",
        description: "فريق من الخبراء لتقديم أفضل النصائح التأمينية"
      }
    ]
  };

  const sections = [
    {
      title: "شركات المجموعة",
      items: [
        "ترست للتأمين",
        "ترست للسياحة والسفر",
        "ترست العقارية",
        "سمارت هيلث",
        "ترست كير"
      ]
    },
    {
      title: "روابط سريعة",
      items: [
        { text: "التقارير السنوية", url: "/reports" },
        { text: "حاسبة التأمين", url: "/calculator" },
        { text: "الأسئلة الشائعة", url: "/faq" },
        { text: "سياسة الخصوصية", url: "/privacy" }
      ]
    },
    {
      title: "معلومات التواصل",
      items: [
        { 
          text: "info@trust.com", 
          icon: <FaEnvelope />, 
          url: "mailto:info@trust.com" 
        },
        { 
          text: "+970 599 123 456", 
          icon: <FaPhoneAlt />, 
          url: "tel:+970599123456" 
        },
        { 
          text: "رام الله - فلسطين", 
          icon: <FaMapMarkerAlt /> 
        },
        { 
          text: "الأحد - الخميس 8ص-4م", 
          icon: <FaClock /> 
        }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://facebook.com/trustinsurance" },
    { icon: <FaTwitter />, url: "https://twitter.com/trustinsurance" },
    { icon: <FaInstagram />, url: "https://instagram.com/trustinsurance" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com/company/trustinsurance" }
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2a2a2a",
        color: "#f0f0f0",
        padding: { xs: "32px 16px", md: "48px 32px" },
        fontFamily: "'Cairo', sans-serif",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #0066cc, #00ccff)"
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Column - Company Info */}
          <Grid item xs={12} md={6}>
            {/* Why Choose Us Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  mb: 3,
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: "60%",
                    height: "3px",
                    backgroundColor: theme.palette.secondary.main
                  }
                }}
              >
                لماذا تختار ترست؟
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                {companyInfo.description}
              </Typography>

              {/* Stats */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {companyInfo.stats.map((stat, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <StatBox>
                      <Typography
                        variant="h4"
                        sx={{
                          color: theme.palette.primary.light,
                          fontWeight: 700,
                          mb: 0.5
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="body2">{stat.label}</Typography>
                    </StatBox>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Features */}
            <Grid container spacing={2}>
              {companyInfo.features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <FeatureCard
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{ 
                      color: theme.palette.primary.main,
                      mb: 1.5
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2">
                      {feature.description}
                    </Typography>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>

            {/* Social Links */}
            <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
              {socialLinks.map((social, index) => (
                <SocialIcon
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                >
                  {social.icon}
                </SocialIcon>
              ))}
            </Box>
          </Grid>

          {/* Right Column - Links */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              {sections.map((section, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      mb: 2,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -8,
                        left: 0,
                        width: "40px",
                        height: "3px",
                        backgroundColor: theme.palette.primary.main
                      }
                    }}
                  >
                    {section.title}
                  </Typography>

                  <Box
                    component="ul"
                    sx={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0
                    }}
                  >
                    {section.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.url ? (
                          <FooterLink
                            as="a"
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.icon && (
                              <Box sx={{ fontSize: "0.9rem" }}>
                                {item.icon}
                              </Box>
                            )}
                            {item.text || item}
                          </FooterLink>
                        ) : (
                          <FooterLink>
                            {item.icon && (
                              <Box sx={{ fontSize: "0.9rem" }}>
                                {item.icon}
                              </Box>
                            )}
                            {item.text || item}
                          </FooterLink>
                        )}
                      </motion.li>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Awards Section */}
            <Box
              sx={{
                mt: 4,
                p: 3,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "12px"
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  mb: 2
                }}
              >
                شهادات وجوائز
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {[
                  "أفضل شركة تأمين 2023",
                  "ISO 9001",
                  "جائزة التميز",
                  "شهادة الأمان المالي"
                ].map((award, index) => (
                  <Chip
                    key={index}
                    label={award}
                    sx={{
                      backgroundColor: "rgba(0, 102, 204, 0.2)",
                      color: theme.palette.primary.light,
                      fontWeight: 500
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Divider sx={{ 
          my: 4,
          borderColor: "rgba(255, 255, 255, 0.1)"
        }} />
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.7)"
          }}
        >
          © جميع الحقوق محفوظة لمجموعة ترست العالمية للتأمين {new Date().getFullYear()} |
          تصميم وتطوير فريق ترست الرقمي
        </Typography>
      </Container>
    </Box>
  );
}

export default React.memo(GrayBox);