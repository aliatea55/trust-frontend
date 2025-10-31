import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  useTheme, 
  useMediaQuery,
  IconButton,
  Fade,
  useScrollTrigger
} from "@mui/material";
import { 
  motion, 
  AnimatePresence,
  useTransform,
  useViewportScroll
} from "framer-motion";
import bgImage from "../assets/bg-home.jpg";
import bgImageMobile from "../assets/bg-home-mobile.jpg";
import bgImagePlaceholder from "../assets/bg-home-placeholder.jpg";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollPrompt, setScrollPrompt] = useState(true);
  const { scrollYProgress } = useViewportScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  // Handle scroll prompt visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setScrollPrompt(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Preload images
  useEffect(() => {
    const img = new Image();
    img.src = isMobile ? bgImageMobile : bgImage;
    img.onload = () => setImageLoaded(true);
  }, [isMobile]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        position: 'relative',
        height: isMobile ? '100vh' : '100vh',
        minHeight: isMobile ? '600px' : '800px',
        maxHeight: '1200px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'common.white',
        px: 4,
            // ✅ أضف السطور التالية:
    mt: 0,
    pt: 0,
    marginTop: 0,
    paddingTop: 0,
      }}
    >
      {/* Background Image with Parallax Effect */}
      <Box
        component={motion.div}
        style={{ y: yPos }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.6) 70%,
            rgba(0, 0, 0, 0.8) 100%
          ), url(${imageLoaded ? (isMobile ? bgImageMobile : bgImage) : bgImagePlaceholder})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          willChange: 'transform',
          transition: 'background-image 0.5s ease',
        }}
      />

      {/* Content Container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          width: '100%',
          px: isMobile ? 2 : 6,
          py: isMobile ? 4 : 8,
        }}
      >
        <AnimatePresence>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            exit={{ opacity: 0 }}
          >
            <Typography
              variant={isMobile ? 'h3' : 'h1'}
              fontWeight="bold"
              mb={3}
              sx={{
                textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)',
                lineHeight: 1.2,
                letterSpacing: '0.5px',
                fontSize: isMobile ? '2.2rem' : isTablet ? '3rem' : '4rem',
              }}
              gutterBottom
            >
              ترست أكبر شركة تأمين في فلسطين
            </Typography>

            <Typography
              variant={isMobile ? 'h6' : 'h4'}
              mb={4}
              sx={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
                lineHeight: 1.6,
                fontWeight: 400,
                maxWidth: '800px',
                margin: '0 auto',
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              نقدم خدمات تأمين موثوقة وشاملة منذ عام 1994
            </Typography>

            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              sx={{ 
                display: 'flex', 
                gap: 3, 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                mt: 4
              }}
            >
              <Button
                component={motion.button}
                whileHover={{ y: -3, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                variant="contained"
                color="secondary"
                size={isMobile ? 'medium' : 'large'}
                sx={{
                  px: isMobile ? 3 : 5,
                  py: isMobile ? 1 : 1.5,
                  fontWeight: 700,
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  borderRadius: '8px',
                  minWidth: isMobile ? '140px' : '180px',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                تواصل معنا
              </Button>

              <Button
                component={motion.button}
                whileHover={{ 
                  y: -3, 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                variant="outlined"
                color="inherit"
                size={isMobile ? 'medium' : 'large'}
                sx={{
                  px: isMobile ? 3 : 5,
                  py: isMobile ? 1 : 1.5,
                  fontWeight: 700,
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  borderWidth: '2px',
                  borderRadius: '8px',
                  minWidth: isMobile ? '140px' : '180px',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  '&:hover': {
                    borderWidth: '2px',
                  },
                }}
              >
                تعرف علينا
              </Button>
            </Box>
          </Box>
        </AnimatePresence>
      </Box>

      {/* Scroll Down Indicator */}
      <Fade in={scrollPrompt && inView} timeout={1000}>
        <Box
          component={motion.div}
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
          sx={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            cursor: 'pointer',
          }}
          onClick={handleScrollDown}
        >
          <Tooltip title="مرر للأسفل" arrow>
            <IconButton
              color="inherit"
              aria-label="scroll down"
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              <ArrowDownwardIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      </Fade>
    </Box>
  );
};

export default React.memo(Hero);