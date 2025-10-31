import { Box } from '@mui/material';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Box>
      {/* ✅ فقط Hero مع الحركة والخلفية */}
      <Hero />

      {/* باقي الصفحة */}
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
