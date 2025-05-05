import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "539331a205e0ac5d2bea52c8";

export const useExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
        );
        setRates(response.data.conversion_rates);
        setError(null);
      } catch (err) {
        setError("Failed to fetch exchange rates", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return { rates, loading, error };
};
