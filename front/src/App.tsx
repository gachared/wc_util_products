import React, { useState, useCallback } from 'react';
import SkuInput from './components/SkuInput';
import SnackbarAlert from './components/SnackbarAlert';
import { usePostData } from './hooks/usePostData';
import { Container } from '@mui/material';

const App: React.FC = () => {
  const { postData, loading, error, response } = usePostData();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = useCallback(
    async (skus: string[]) => {
      await postData(skus);
      setOpenSnackbar(true);
    },
    [postData]
  );

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <SkuInput onSubmit={handleSubmit} loading={loading} />

      <SnackbarAlert
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity={error ? 'error' : 'success'}
        message={error ? '失敗しました' : '成功しました'}
      />
    </Container>
  );
};

export default App;
