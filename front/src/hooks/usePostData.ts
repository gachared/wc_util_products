import axios from 'axios';
import { useState } from 'react';

const ajaxUrl = 'YOUR_AJAX_URL'; // ここに実際のURLを入れてください

export const usePostData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postData = async (skuData: string[]) => {
    setLoading(true);
    setError(null);

    const payload = {
      action: 'save_options',
      nonce: 'YOUR_NONCE', // ここに実際のnonceを入れてください
      data: JSON.stringify(skuData),
    };

    try {
      const res = await axios.post(ajaxUrl, payload);
      setResponse(res.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response };
};
