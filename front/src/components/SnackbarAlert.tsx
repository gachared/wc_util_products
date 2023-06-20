import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarAlertProps {
  open: boolean;
  onClose: () => void;
  severity: 'success' | 'error';
  message: string;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  open,
  onClose,
  severity,
  message,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
