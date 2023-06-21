import { useState, useCallback, FC } from 'react';
import SkuInput from './components/SkuInput';
import SnackbarAlert from './components/SnackbarAlert';
import { usePostData } from './hooks/usePostData';
import { Container } from '@mui/material';

const App: FC = () => {
  const { postData, loading, error } = usePostData(
    import.meta.env.VITE_API_URL
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = useCallback(
    async (data: { [key: string]: string[] }) => {
      await postData(data);
      setOpenSnackbar(true);
    },
    [postData]
  );

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <SkuInput
        codeType='おすすめ'
        codeKey='recommend'
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <SkuInput
        codeType='ランキング'
        codeKey='ranking'
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <SnackbarAlert
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity={error ? 'error' : 'success'}
        message={
          error ? error : '反映に成功しました。TOPページから確認してください'
        }
      />
    </Container>
  );
};

export default App;
