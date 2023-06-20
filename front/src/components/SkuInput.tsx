import { useState, useCallback, FC } from 'react';
import { Button, TextField } from '@mui/material';

interface SkuInputProps {
  codeType: string;
  codeKey: string;
  handleSubmit: (data: { [key: string]: string[] }) => void;
  loading: boolean;
}

const SkuInput: FC<SkuInputProps> = ({
  codeType,
  codeKey,
  handleSubmit,
  loading,
}) => {
  const [skus, setSkus] = useState(['', '', '']);
  const [errors, setErrors] = useState([false, false, false]); // 各フィールドのエラー状態を管理

  const handleBlur = useCallback(
    (index: number, value: string) => {
      // 正規表現パターンに合致するかチェック
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
        sx={{ marginLeft: 1, marginY: 3 }}
        onClick={() => handleSubmit({ [codeKey]: skus })}
        disabled={loading || errors.some((error) => error)}
      >
        {codeType}へ反映
      </Button>
    </div>
  );
};

export default SkuInput;
