import { useState, useCallback, FC } from 'react';
import { Button, TextField } from '@mui/material';
import SnackbarAlert from './SnackbarAlert';
import { usePostData } from '../hooks/usePostData';

interface SkuInputProps {
  codeType: string;
  codeKey: string;
}

const SkuInput: FC<SkuInputProps> = ({ codeType, codeKey }) => {
  const [skus, setSkus] = useState(['', '', '']);
  const [errors, setErrors] = useState([false, false, false]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { postData, loading, error } = usePostData(
    import.meta.env.VITE_API_URL
  );

  const handleBlur = useCallback(
    (index: number, value: string) => {
      const pattern = /^[A-Za-z0-9-]*$/;
      const newErrors = [...errors];
      newErrors[index] = !pattern.test(value);
      setErrors(newErrors);
    },
    [errors]
  );

  const handleChange = useCallback(
    (index: number, value: string) => {
      const newSkus = [...skus];
      newSkus[index] = value;
      setSkus(newSkus);
    },
    [skus]
  );

  const handleSubmission = useCallback(async () => {
    await postData({ [codeKey]: skus });
    setOpenSnackbar(true); // postData後にSnackbarを開く
  }, [postData, codeKey, skus]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      {skus.map((sku, index) => (
        <TextField
          key={index}
          label={`商品 ${index + 1}`}
          variant='standard'
          value={sku}
          onChange={(e) => handleChange(index, e.target.value)}
          onBlur={(e) => handleBlur(index, e.target.value)}
          error={errors[index]}
          helperText={errors[index] ? '英数字と「-」のみ許可されています' : ''}
          sx={{ margin: 1 }}
        />
      ))}
      <br />
      <Button
        variant='contained'
        sx={{ marginLeft: 1, marginTop: 3 }}
        onClick={handleSubmission}
        disabled={loading || errors.some((error) => error)}
      >
        {codeType}へ反映
      </Button>
      <SnackbarAlert
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity={error ? 'error' : 'success'}
        message={
          error ? error : '反映に成功しました。TOPページから確認してください'
        }
      />
    </div>
  );
};

export default SkuInput;
