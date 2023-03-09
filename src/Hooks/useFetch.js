import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setLoading(true);
      try {
        const response = await axios.get('/data.json', {
          cancelToken: source.token
        }).then(res => {
          return res.data;
        });
        if (isMounted) {
          setData({
            ...response,
            terminals: response.terminals.data,
            shifts: response.shifts.data,
            errors: response.errors.data,
            logins: response.logins.data,
          });
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setTimeout(() => setLoading(false), 2000);
      }
    }

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    }

    return cleanUp;
  }, [dataUrl]);

  return { ...data, error, loading };
}

export default useFetch;
