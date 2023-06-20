import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { usePostData } from '../hooks/usePostData';

const SkuInput: React.FC = () => {
  const [skus, setSkus] = useState(['', '', '']);
  const { postData, loading, error, response } = usePostData();

  const handleChange = (index: number, value: string) => {
    const newSkus = [...skus];
    newSkus[index] = value;
    setSkus(newSkus);
  };

  const handleSubmit = () => {
    postData(skus);
  };

  return (
    <div>
      {/* SKU入力フィールド */}
      {skus.map((sku, index) => (
        <TextField
          key={index}
          label={`SKU ${index + 1}`}
          value={sku}
          onChange={(e) => handleChange(index, e.target.value)}
          inputProps={{ pattern: '^[A-Za-z0-9-]+$' }} // 英数字と「-」のみ許可
        />
      ))}

      {/* ボタン */}
      <Button onClick={handleSubmit} disabled={loading}>
        ショートコード生成
      </Button>
    </div>
  );
};

export default SkuInput;
