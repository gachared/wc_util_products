import axios from 'axios';
import { useState } from 'react';

export const usePostData = (ajaxUrl: string, nonce: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState(null);

  const postData = async (skuData: string[]) => {
    setLoading(true);
    setError(null);

    const payload = {
      action: 'save_options',
      nonce: nonce,
      data: JSON.stringify(skuData),
    };

    try {
      const res = await axios.post(ajaxUrl, payload);

      if (res.status >= 200 && res.status < 300) {
        setResponse(res.data);
      } else {
        setError(`Server responded with status code: ${res.status}`);
      }
    } catch (e) {
      setError(`Request failed with error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response };
};
