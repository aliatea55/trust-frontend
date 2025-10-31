import React, { useState, useEffect } from 'react';
import {
  Box,  Avatar, Button, TextField,
  InputAdornment, IconButton, Paper, MenuItem
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState({});
  const [newPwMode, setNewPwMode] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem('user'));
  if (!savedUser) return navigate('/login');
  setUser(savedUser);

  if (savedUser.profileImageUrl) {
    setPreview(`https://localhost:5203${savedUser.profileImageUrl}`);
  }
}, [navigate]); // ✅ أضف navigate هنا




  const handleImageChange = (e) => {
    const file = e.target.files[0];
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

      const updatedUser = { ...user, profileImageUrl: res.data.profileImageUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSelectedImage(null);
      window.location.reload();
    } catch (err) {
      alert("فشل رفع الصورة");
    }
  };
const userData = {
  id: user.id,
  fullName: user.fullName,
  gender: user.gender,
  nationalId: user.nationalId,
  birthDate: user.birthDate ? new Date(user.birthDate).toISOString() : null,
};

  const handleUpdate = async () => {
    try {
      const response = await api.put('/users/update-own', userData);

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(user));
        alert("✅ تم حفظ التغييرات بنجاح");
      }
    } catch (error) {
      console.error("❌ فشل حفظ البيانات:", error);
      alert("❌ حدث خطأ أثناء حفظ البيانات");
    }
  };


  const handlePasswordUpdate = () => {
    if (user.password !== confirmPassword) {
      alert("كلمة المرور غير متطابقة");
      return;
    }
    handleUpdate();
    setNewPwMode(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar src={preview} alt={user.fullName} sx={{ width: 100, height: 100 }}>
            {user.fullName?.charAt(0)}
          </Avatar>

          <Button variant="text" component="label" sx={{ mt: 1 }}>
            تغيير الصورة
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>

          {selectedImage && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              sx={{ mt: 1 }}
            >
              حفظ الصورة
            </Button>
          )}
        </Box>

        <TextField
          fullWidth
          label="الاسم الكامل"
          margin="normal"
          value={user.fullName || ''}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
        />
        <TextField
          fullWidth
          label="البريد الإلكتروني"
          margin="normal"
          value={user.email || ''}
          disabled
        />
        <TextField
          fullWidth
          label="رقم الهوية"
          margin="normal"
          value={user.nationalId || ''}
          onChange={(e) => setUser({ ...user, nationalId: e.target.value })}
        />
        
<TextField
  select
  fullWidth
  label="الجنس"
  margin="normal"
  value={user.gender ?? ''}
  onChange={(e) => setUser({ ...user, gender: e.target.value })}
>
  <MenuItem value={1}>ذكر</MenuItem>
<MenuItem value={2}>أنثى</MenuItem>

</TextField>


        <TextField
          fullWidth
          label="تاريخ الميلاد"
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={user.birthDate ? user.birthDate.split('T')[0] : ''}
          onChange={(e) => setUser({ ...user, birthDate: e.target.value })}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleUpdate}
        >
          حفظ التغييرات
        </Button>

        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={() => setNewPwMode(!newPwMode)}
        >
          تغيير كلمة المرور
        </Button>

        {newPwMode && (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="كلمة المرور الجديدة"
              type={showPw ? 'text' : 'password'}
              value={user.password || ''}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPw(!showPw)}>
                      {showPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="تأكيد كلمة المرور"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handlePasswordUpdate}
            >
              حفظ كلمة المرور
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
}
