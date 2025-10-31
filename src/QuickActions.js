import { Button, Grid, Typography } from '@mui/material';
import { PersonAdd, Settings, Description, Assessment } from '@mui/icons-material';

export default function QuickActions({ isAdmin }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<PersonAdd />}
          sx={{ height: 80 }}
        >
          مستخدم جديد
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Settings />}
          sx={{ height: 80 }}
        >
          الإعدادات
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Description />}
          sx={{ height: 80 }}
        >
          التقارير
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Assessment />}
          sx={{ height: 80 }}
        >
          التحليلات
        </Button>
      </Grid>
      {isAdmin && (
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
            لديك صلاحيات المدير
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
