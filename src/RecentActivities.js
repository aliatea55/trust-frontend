import { List, ListItem, ListItemText, ListItemIcon, Typography, Divider } from '@mui/material';
import { Circle } from '@mui/icons-material';
import React from 'react';

export default function RecentActivities() {
  const activities = [
    { id: 1, text: 'تم تسجيل دخول جديد', time: 'منذ 5 دقائق' },
    { id: 2, text: 'تم تحديث الملف الشخصي', time: 'منذ ساعة' },
    { id: 3, text: 'تم إنشاء مستخدم جديد', time: 'منذ 3 ساعات' },
    { id: 4, text: 'تم إكمال المهمة رقم 245', time: 'منذ يوم' },
    { id: 5, text: 'إشعار نظام جديد', time: 'منذ يومين' }
  ];

  return (
    <List>
      {activities.map((activity, index) => (
        <React.Fragment key={activity.id}>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Circle sx={{ fontSize: 8, color: 'primary.main' }} />
            </ListItemIcon>
            <ListItemText
              primary={activity.text}
              secondary={activity.time}
              secondaryTypographyProps={{ color: 'textSecondary' }}
            />
          </ListItem>
          {index < activities.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}