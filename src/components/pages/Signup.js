import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  InputAdornment,
  IconButton,
  Fade,
  Zoom,
  Alert,
  Collapse,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  Badge,
  Cake,
  Transgender
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import api from '../../utils/api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 500,
  width: '100%',
  boxShadow: theme.shadows[10],
  borderRadius: '16px',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
}));

const IconTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    paddingRight: theme.spacing(4)
  }
}));

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    idNumber: '',
    birthDate: '',
    gender: ''
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    let temp = {};
    temp.fullName = form.fullName.trim() ? '' : 'الاسم الكامل مطلوب';
    temp.email = /\S+@\S+\.\S+/.test(form.email) ? '' : 'بريد إلكتروني غير صالح';
    temp.password = form.password.length >= 8 ? '' : 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    temp.confirmPassword = form.confirmPassword === form.password ? '' : 'كلمة المرور غير متطابقة';
    temp.idNumber = /^\d{9,10}$/.test(form.idNumber) ? '' : 'رقم الهوية يجب أن يكون من 9 أو 10 أرقام';
    if (form.birthDate) {
      const birthDate = new Date(form.birthDate);
      const ageDiff = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiff);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      temp.birthDate = age >= 18 ? '' : 'يجب أن يكون عمرك 18 سنة على الأقل';
    } else {
      temp.birthDate = 'تاريخ الميلاد مطلوب';
    }
   temp.gender = form.gender === 1 || form.gender === 2 || form.gender === "1" || form.gender === "2"
  ? ''
  : 'اختر الجنس';

    setErrors(temp);
    return Object.values(temp).every(x => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) {
      setSubmitError('الرجاء تصحيح الأخطاء في النموذج');
      return;
    }
    setIsSubmitting(true);
    try {
      console.log("📤 البيانات المرسلة:", {
  fullName: form.fullName,
  email: form.email,
  password: form.password,
  nationalId: form.idNumber,
  birthDate: new Date(form.birthDate).toISOString().split('T')[0],
  gender: form.gender
});
const response = await api.post('/users/register', {
  fullName: form.fullName,
  email: form.email,
  password: form.password,
  nationalId: form.idNumber,
  birthDate: new Date(form.birthDate).toISOString().split('T')[0],
  genderId: parseInt(form.gender)
});


      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        direction: 'rtl'
      }}
    >
      <Zoom in={true} style={{ transitionDelay: '100ms' }}>
        <StyledPaper>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center" color="primary">
            إنشاء حساب جديد
          </Typography>

          <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
            انضم إلينا وابدأ رحلتك معنا
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Collapse in={!!submitError && !success}>
            <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>
          </Collapse>

          <Collapse in={success}>
            <Alert severity="success" sx={{ mb: 2 }}>
              تم إنشاء الحساب بنجاح! يتم تحويلك إلى صفحة تسجيل الدخول...
            </Alert>
          </Collapse>

          <form onSubmit={handleSubmit}>
            <IconTextField label="Full Name" fullWidth name="fullName" value={form.fullName} onChange={handleChange} error={!!errors.fullName} helperText={errors.fullName} margin="normal"
              InputProps={{ startAdornment: <InputAdornment position="start"><Person color={errors.fullName ? 'error' : 'action'} /></InputAdornment> }}
            />

            <IconTextField label="Email" fullWidth name="email" value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} margin="normal"
              InputProps={{ startAdornment: <InputAdornment position="start"><Email color={errors.email ? 'error' : 'action'} /></InputAdornment> }}
            />

            <IconTextField label="Password" fullWidth name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock color={errors.password ? 'error' : 'action'} /></InputAdornment>,
                endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPw(!showPw)}>{showPw ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>
              }}
            />

            <IconTextField label="Confirm Password" fullWidth name="confirmPassword" type={showConfirmPw ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock color={errors.confirmPassword ? 'error' : 'action'} /></InputAdornment>,
                endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowConfirmPw(!showConfirmPw)}>{showConfirmPw ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>
              }}
            />

            <IconTextField label="Id Number" fullWidth name="idNumber" value={form.idNumber} onChange={handleChange} error={!!errors.idNumber} helperText={errors.idNumber} margin="normal"
              InputProps={{ startAdornment: <InputAdornment position="start"><Badge color={errors.idNumber ? 'error' : 'action'} /></InputAdornment> }}
            />

            <IconTextField label="Date" type="date" fullWidth name="birthDate" InputLabelProps={{ shrink: true }} value={form.birthDate} onChange={handleChange} error={!!errors.birthDate} helperText={errors.birthDate} margin="normal"
              InputProps={{ startAdornment: <InputAdornment position="start"><Cake color={errors.birthDate ? 'error' : 'action'} /></InputAdornment> }}
            />

            <IconTextField label="الجنس" select fullWidth name="gender" value={form.gender} onChange={handleChange} error={!!errors.gender} helperText={errors.gender} margin="normal"
              InputProps={{ startAdornment: <InputAdornment position="start"><Transgender color={errors.gender ? 'error' : 'action'} /></InputAdornment> }}
            >
              <MenuItem value={1}>ذكر</MenuItem>
<MenuItem value={2}>أنثى</MenuItem>
            </IconTextField>

            <Fade in={!isSubmitting && !success}>
              <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3, fontWeight: 'bold', py: 1.5, fontSize: '1.1rem', borderRadius: '12px' }} disabled={isSubmitting}>
                إنشاء حساب
              </Button>
            </Fade>

            {isSubmitting && <Box display="flex" justifyContent="center" mt={3}><CircularProgress size={32} /></Box>}

            <Typography variant="body2" textAlign="center" mt={2} color="text.secondary">
              لديك حساب بالفعل؟{' '}
              <Button variant="text" size="small" color="primary" onClick={() => navigate('/login')} sx={{ fontWeight: 'bold' }}>
                تسجيل الدخول
              </Button>
            </Typography>
          </form>
        </StyledPaper>
      </Zoom>
    </Box>
  );
}
