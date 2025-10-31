import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import theme from "./theme/theme";

// استيراد المكونات والصفحات
import TopLinks from "./components/TopLinks";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import TrustGroupSection from "./components/TrustGroupSection";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./Dashboard";
import UserList from "./components/pages/UserList";
import ProfileSetup from "./components/pages/Profile";
import Profile from "./components/pages/Profile";
import EditUser from "./components/pages/EditUser";

function HoverableText({ text }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Typography
      variant="body1"
      sx={{
        fontSize: "20px",
        fontWeight: 600,
        my: 1,
        color: hovered ? "#ff7f00" : "#333",
        cursor: "pointer",
        transition: "color 0.3s ease, text-shadow 0.3s ease",
        textShadow: hovered ? "2px 2px 5px rgba(0,0,0,0.3)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {text}
    </Typography>
  );
}

function GrayBox() {
  const items = [];
  return (
    <Box
      sx={{
        backgroundColor: "#6c757d",
        color: "white",
        py: 5,
        px: 4,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 5,
        fontFamily: "'Cairo', sans-serif",
      }}
    >
      <Box sx={{ flex: { xs: 1, md: "1 1 200px" }, minWidth: 200 }}>
        {items.slice(0, 6).map((item, idx) => (
          <HoverableText key={idx} text={item} />
        ))}
      </Box>
      <Box sx={{ flex: { xs: 1, md: "1 1 200px" }, minWidth: 200 }}>
        {items.slice(6, 13).map((item, idx) => (
          <HoverableText key={idx + 6} text={item} />
        ))}
      </Box>
      <Box
        sx={{
          flexBasis: "100%",
          mt: 4,
          fontSize: 14,
          fontWeight: 400,
          color: "#ccc",
          textAlign: "center",
        }}
      >
        © جميع الحقوق محفوظة - مجموعة ترست العالمية للتأمين م.ع.م (1994 -{" "}
        {new Date().getFullYear()})
      </Box>
    </Box>
  );
}

function HomePage() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.email === "ali.admin@trust.com";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Cairo', sans-serif",
        fontWeight: 700,
        color: "#333",
      }}
    >
<Box
  sx={{
    position: 'relative',
    width: '100%',
    height: 'auto',
    aspectRatio: '17.1/6',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
  }}
>
  {/* صورة الخلفية */}
  <Box
    component="img"
    src="/website-02.jpg"
    alt="background"
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: 'center',
      zIndex: -2,
    }}
  />

  {/* الطبقة الداكنة الشفافة (لون باهت) */}
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.65)', // 🔍 عدل الرقم حسب التعتيم اللي بدك إياه
      zIndex: -1,
    }}
  />

  {/* المحتوى */}
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1,
      width: '90%',
      maxWidth: '1000px',
      textAlign: 'center',
      px: { xs: 2, md: 4 },
    }}
  >
    {/* العناوين والأزرار هون */}
  </Box>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ maxWidth: 800 }}
        >
          <Typography variant="h2" fontWeight="bold" mb={3}>
            ترست أكبر شركة تأمين في فلسطين
          </Typography>

          <Typography variant="h5" mb={4}>
            نقدم خدمات تأمين موثوقة وشاملة منذ عام 1994
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                 backgroundColor: "#004080", // الأزرق الغامق
                fontWeight: "bold",
                "&:hover": { transform: "translateY(-3px)" },
                transition: "all 0.3s ease",
              }}
            >
              تواصل معنا
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                
                borderWidth: "2px",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                transition: "all 0.3s ease",
              }}
            >
              تعرف علينا
            </Button>
          </Box>
        </motion.div>
      </Box>

      {/* عنوان الشعار الثانوي */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#6c757d",
          fontWeight: 700,
          my: 4,
          cursor: "pointer",
          transition: "text-shadow 0.3s ease",
          textShadow: isHovered ? "2px 2px 5px rgba(0,0,0,0.4)" : "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        مجموعة ترست العالمية للتأمين في فلسطين
      </Typography>

      {isAdmin && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/users")}
          sx={{ mt: 2, alignSelf: "center" }}
        >
          عرض المستخدمين
        </Button>
      )}

      <TrustGroupSection />

      <Box sx={{ flexGrow: 1 }} />
      <GrayBox />
    </Box>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId="432500075930-ctq24fntbtbcmr39m7vclomjh180mh9h.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <TopLinks />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
    
  );
  
}

export default App;