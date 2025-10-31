import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  Tooltip,
  InputAdornment
} from '@mui/material';
import {
  Save,
  Cancel,
  Person,
  Email,
  Fingerprint,
  Transgender,
  Cake,
  ArrowBack,
  Edit
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import dayjs from 'dayjs';

function EditUserImage({ avatar, userFullName, onImageChange }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{ position: 'relative', width: 120, height: 120, mx: 'auto' }}>
      <Avatar
        src={avatar}
        alt={userFullName}
        sx={{
          width: 120,
          height: 120,
          fontSize: 48,
          mb: 2
        }}
      >
        {userFullName?.charAt(0)}
      </Avatar>
      <Tooltip title="تعديل الصورة">
        <IconButton
          onClick={handleClick}
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            backgroundColor: '#fff',
            borderRadius: '50%',
            boxShadow: 1,
            '&:hover': { backgroundColor: '#eee' }
          }}
        >
          <Edit color="primary" />
        </IconButton>
      </Tooltip>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onImageChange}
      />
    </Box>
  );
}

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await api.get(`/users/${id}`);
      setUser(response.data);
      setPreview(response.data.profileImageUrl ? `https://localhost:5203${response.data.profileImageUrl}` : null);
    } catch (error) {
      alert(error.response?.data?.message || 'حدث خطأ في جلب المستخدم');
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, [id]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      showSnackbar('حجم الصورة يجب أن يكون أقل من 5MB', 'error');
      return;
    }
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage || !user) return;
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("image", selectedImage);

    try {
      const res = await api.post('/users/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUser({ ...user, profileImageUrl: res.data.profileImageUrl });
      setSelectedImage(null);
      showSnackbar('تم تحديث الصورة بنجاح', 'success');
    } catch (err) {
      showSnackbar('فشل رفع الصورة', 'error');
    }
  };

const handleUpdate = async () => {
  setUpdating(true);
  try {
    const endpoint = user.email === 'ali.admin@trust.com' ? '/users/update' : '/users/update-own';
    const headers = user.email === 'ali.admin@trust.com' ? { IsAdminEmail: user.email } : {};

    await api.put(endpoint, user, { headers });

    showSnackbar('تم تحديث البيانات بنجاح', 'success');
    setTimeout(() => navigate('/users'), 1000);
  } catch (err) {
    console.error("Error updating user:", err);
    showSnackbar(err.response?.data?.message || 'فشل في تحديث البيانات', 'error');
  } finally {
    setUpdating(false);
  }
};

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Alert severity="error" sx={{ mt: 4, mx: 'auto', maxWidth: 600 }}>
        لم يتم العثور على المستخدم
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              تعديل بيانات المستخدم
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/users')}
            >
              رجوع
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mb: 3,
              minWidth: 200
            }}>
              <EditUserImage 
                avatar={preview} 
                userFullName={user.fullName}
                onImageChange={handleImageChange} 
              />

              {selectedImage && (
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleUpload}
                  >
                    حفظ الصورة
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setSelectedImage(null);
                      setPreview(user.profileImageUrl ? 
                        `https://localhost:5203${user.profileImageUrl}` : null);
                    }}
                  >
                    إلغاء
                  </Button>
                </Box>
              )}
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                label="الاسم الكامل"
                margin="normal"
                value={user.fullName || ''}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label="البريد الإلكتروني"
                margin="normal"
                disabled
                value={user.email || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label="رقم الهوية"
                margin="normal"
                value={user.nationalId || ''}
                onChange={(e) => setUser({ ...user, nationalId: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Fingerprint color="action" />
                    </InputAdornment>
                  )
                }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>الجنس</InputLabel>
                <Select
                  value={user.gender || ''}
                  label="الجنس"
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                >
                  <MenuItem value="ذكر">ذكر</MenuItem>
                  <MenuItem value="أنثى">أنثى</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="date"
                label="تاريخ الميلاد"
                InputLabelProps={{ shrink: true }}
                margin="normal"
                value={user.birthDate ? dayjs(user.birthDate).format('YYYY-MM-DD') : ''}
                onChange={(e) => setUser({ ...user, birthDate: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake color="action" />
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              onClick={() => navigate('/users')}
            >
              إلغاء
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={updating ? <CircularProgress size={20} /> : <Save />}
              onClick={handleUpdate}
              disabled={updating}
            >
              {updating ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </Button>
          </Box>
        </Paper>
      </motion.div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}