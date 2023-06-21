import axios from 'axios';
import { useState } from 'react';
import qs from 'qs'; // 追加：qsライブラリをインポート

export const usePostData = (ajaxUrl: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState(null);

  const postData = async (dataObject: object) => {
    setLoading(true);
    setError(null);

    const payload = {
      action: 'save_options',
      data: JSON.stringify(dataObject),
    };

    try {
      const res = await axios.post(ajaxUrl, qs.stringify(payload), {
        // 更新：qs.stringifyを使用してペイロードをエンコード
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // 更新：ヘッダーにContent-Typeを追加
        },
      });

      if (res.status >= 200 && res.status < 300) {
        setResponse(res.data);
      } else {
        setError(`PostDataのステータスコードのレスポンス: ${res.status}`);
      }
    } catch (e) {
      setError(`PostDataに失敗しました: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response };
};
