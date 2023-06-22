import { useCallback, FC, useState } from 'react';
import { Button, TextField } from '@mui/material';
import SnackbarAlert from './SnackbarAlert';
import { usePostData } from '../hooks/usePostData';
import { useFieldArray } from '../hooks/useFieldArray';

interface SkuInputProps {
  codeType: string;
  codeKey: string;
}

const SkuInput: FC<SkuInputProps> = ({ codeType, codeKey }) => {
  const { postData, loading, error } = usePostData(
    import.meta.env.VITE_API_URL
  );

  const pattern = /^[A-Za-z0-9-]*$/;
  const {
    values: skus,
    errors,
    handleChange,
  } = useFieldArray<string>(
    ['', '', ''],
    (value) => value.length === 0 || !pattern.test(value)
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmission = useCallback(async () => {
    await postData({ [codeKey]: skus });
    setOpenSnackbar(true);
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
          error={errors[index]}
          helperText={errors[index] ? '空欄または不正な文字列です' : ''}
          sx={{ margin: 1 }}
        />
      ))}
      <br />
      <Button
        variant='contained'
        sx={{ marginLeft: 1, marginTop: 2, marginBottom: 2 }}
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
