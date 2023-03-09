import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useFetch() {
  const [terminals, setTerminals] = useState(undefined);
  const [shifts, setShifts] = useState(undefined);
  const [logins, setLogins] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    axios
      .get('/data.json')
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setTerminals(res.terminals.data);
        setShifts(res.shifts.data);
        setLogins(res.login.data)
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { terminals, shifts, logins, loading, error };
}

export default useFetch;
