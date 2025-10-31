import { Box } from '@mui/material';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Box>
      {/* خلفية الصفحة بدون عناوين أو أزرار */}
      <Box
        sx={{
          backgroundImage: "url(/website-02.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "300px", md: "400px" },
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          textAlign: "center",
          position: "relative",
          '&::before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }
        }}
      >
        {/* تم حذف العناوين والزر بالكامل */}
      </Box>

      {/* باقي الصفحة */}
      <Hero />
      <Box
        sx={{
          flexGrow: 1,
          py: 6,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* محتوى الصفحة الرئيسية */}
      </Box>
      <Footer />
    </Box>
  );
}
