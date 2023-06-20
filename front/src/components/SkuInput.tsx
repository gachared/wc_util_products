import React, { useState, useCallback } from 'react';
import { Button, TextField } from '@mui/material';

interface SkuInputProps {
  handleSubmit: (skus: string[]) => void;
  loading: boolean;
}

const SkuInput: React.FC<SkuInputProps> = ({ handleSubmit, loading }) => {
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
          label={`SKU ${index + 1}`}
          value={sku}
          onChange={(e) => handleChange(index, e.target.value)}
          inputProps={{ pattern: '^[A-Za-z0-9-]+$' }}
        />
      ))}
      <Button onClick={() => handleSubmit(skus)} disabled={loading}>
        ショートコード生成
      </Button>
    </div>
  );
};

export default SkuInput;
