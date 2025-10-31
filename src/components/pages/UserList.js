import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  CircularProgress,
  Avatar,
  Chip,
  Snackbar,
  Alert,
  TablePagination,
  InputAdornment
} from '@mui/material';
import {
  MoreVert,
  Refresh,
  Edit,
  Delete,
  LockReset,
  Search,
  Email,
  Add,
  Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

const fetchUsers = async () => {
  setLoading(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser?.email) {
    showSnackbar("لم يتم العثور على بيانات المستخدم", "error");
    setLoading(false);
    return;
  }

  try {
    const response = await api.get('/users/all', {
      headers: {
        IsAdminEmail: currentUser.email
      }
    });
    setUsers(response.data);
  } catch (error) {
    showSnackbar(error.response?.data?.message || 'حدث خطأ في جلب المستخدمين', 'error');
  } finally {
    setLoading(false);
  }
};


  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      showSnackbar('كلمة المرور غير متطابقة', 'error');
      return;
    }

    try {
      await api.put(`/users/update-password/${selectedUser.id}`, 
        JSON.stringify(newPassword), 
        {
          headers: {
            'Content-Type': 'application/json',
            IsAdminEmail: currentUser.email
          }
        }
      );
      showSnackbar('تم تغيير كلمة المرور بنجاح', 'success');
      setOpenResetDialog(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      showSnackbar('فشل تغيير كلمة المرور', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/users/delete/${selectedUser.id}`, {
        headers: {
          IsAdminEmail: currentUser.email
        }
      });
      showSnackbar('تم حذف المستخدم بنجاح', 'success');
      fetchUsers();
    } catch (err) {
      showSnackbar('فشل حذف المستخدم', 'error');
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const filteredUsers = users.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nationalId?.includes(searchTerm)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
if (currentUser?.email !== 'ali.admin@trust.com') {
  return (
    <Box sx={{ p: 4 }}>
      <Alert severity="error" variant="filled">
        غير مصرح لك بعرض هذه الصفحة
      </Alert>
    </Box>
  );
}

  return (
    <Box sx={{ p: 4 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h4" fontWeight="bold">
            إدارة المستخدمين
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<Add />}
              onClick={() => navigate('/signup')}
            >
              مستخدم جديد
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<Refresh />}
              onClick={fetchUsers}
              disabled={loading}
            >
              تحديث
            </Button>
          </Box>
        </Box>

        <Paper sx={{ mb: 3, p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="ابحث عن مستخدم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <IconButton onClick={() => setSearchTerm('')}>
                  <CloseIcon />
                </IconButton>
              )
            }}
          />
        </Paper>

        <Paper sx={{ overflowX: 'auto', position: 'relative' }}>
          {loading && (
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)',
              zIndex: 1
            }}>
              <CircularProgress />
            </Box>
          )}

          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'background.paper' }}>
                <TableCell>المستخدم</TableCell>
                <TableCell>البريد الإلكتروني</TableCell>
                <TableCell>رقم الهوية</TableCell>
                <TableCell>العمر</TableCell>
                <TableCell>الجنس</TableCell>
                <TableCell>الحالة</TableCell>
                <TableCell align="center">التحكم</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar 
                            src={user.profileImageUrl ? 
                              `https://localhost:5203${user.profileImageUrl}` : null}
                            alt={user.fullName}
                          >
                            {user.fullName?.charAt(0)}
                          </Avatar>
                          <Typography fontWeight="medium">
                            {user.fullName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Email color="action" fontSize="small" />
                          {user.email}
                        </Box>
                      </TableCell>
                      <TableCell>{user.nationalId || '-'}</TableCell>
                      <TableCell>
                        {user.birthDate ? 
                          `${dayjs().diff(user.birthDate, 'year')} سنة` : '-'}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={user.gender || 'غير محدد'} 
                          size="small"
                          color={user.gender === 'ذكر' ? 'primary' : 'secondary'}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={user.isActive ? 'نشط' : 'غير نشط'} 
                          color={user.isActive ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="خيارات">
                          <IconButton onClick={(e) => handleMenuClick(e, user)}>
                            <MoreVert />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="textSecondary">
                      {searchTerm ? 'لا توجد نتائج مطابقة للبحث' : 'لا يوجد مستخدمين مسجلين'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="عدد الصفوف:"
            labelDisplayedRows={({ from, to, count }) => 
              `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`}
          />
        </Paper>

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem 
            onClick={() => {
              navigate(`/edit-user/${selectedUser.id}`);
              handleMenuClose();
            }}
            sx={{ minWidth: 180 }}
          >
            <Edit sx={{ mr: 1 }} /> تعديل البيانات
          </MenuItem>
          <MenuItem 
            onClick={() => {
              setOpenResetDialog(true);
              handleMenuClose();
            }}
          >
            <LockReset sx={{ mr: 1 }} /> تغيير كلمة المرور
          </MenuItem>
          <MenuItem 
            onClick={() => {
              setOpenDeleteDialog(true);
              handleMenuClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Delete sx={{ mr: 1 }} /> حذف المستخدم
          </MenuItem>
        </Menu>

        {/* Reset Password Dialog */}
        <Dialog open={openResetDialog} onClose={() => setOpenResetDialog(false)}>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LockReset color="primary" />
              تغيير كلمة المرور للمستخدم
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Typography gutterBottom>
              تغيير كلمة مرور المستخدم: <strong>{selectedUser?.fullName}</strong>
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="كلمة المرور الجديدة"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="تأكيد كلمة المرور"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenResetDialog(false)}>إلغاء</Button>
            <Button 
              variant="contained" 
              onClick={handleResetPassword}
              disabled={!newPassword || !confirmPassword}
            >
              حفظ
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle sx={{ color: 'error.main' }}>
            تأكيد حذف المستخدم
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Typography>
              هل أنت متأكد أنك تريد حذف المستخدم <strong>{selectedUser?.fullName}</strong>؟
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              ملاحظة: لا يمكن التراجع عن هذه العملية
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>
            <Button 
              variant="contained" 
              color="error"
              onClick={handleDelete}
            >
              تأكيد الحذف
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
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
      </motion.div>
    </Box>
  );
}