import { useState, useCallback, FC } from 'react';
import { Button, TextField } from '@mui/material';

interface SkuInputProps {
  handleSubmit: (skus: string[]) => void;
  loading: boolean;
}

const SkuInput: FC<SkuInputProps> = ({ handleSubmit, loading }) => {
  const [skus, setSkus] = useState(['', '', '']);

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
          inputProps={{ pattern: '^[A-Za-z0-9-]+$' }}
          sx={{ margin: 1 }}
        />
      ))}
      <br />
      <Button
        sx={{ marginTop: 1 }}
        onClick={() => handleSubmit(skus)}
        disabled={loading}
      >
        ショートコード生成
      </Button>
    </div>
  );
};

export default SkuInput;
