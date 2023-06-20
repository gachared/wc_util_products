import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarAlertProps {
  open: boolean;
  onClose: () => void;
  severity: 'success' | 'error';
  message: string;
  autoHideDuration?: number; // autoHideDurationを追加
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  open,
  onClose,
  severity,
  message,
  autoHideDuration = 6000, // デフォルト値を設定
}) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
