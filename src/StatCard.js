import { Card, CardContent, Typography, Box } from '@mui/material';

export default function StatCard({ title, value, icon, color }) {
  return (
    <Card sx={{ 
      height: '100%',
      borderLeft: `4px solid ${color}`,
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)'
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color
          }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
