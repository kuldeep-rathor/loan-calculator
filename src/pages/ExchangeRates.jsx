import { Box, Typography } from "@mui/material";
import { useEmiCalculator } from "../hooks/useEmiCalculator";
import { useExchangeRates } from "../hooks/useExchangeRates";
import ConvertedEmiTable from "../components/ConvertedEmiTable";
import { useEffect } from "react";

const ExchangeRates = () => {
  const { emi, calculateEMI } = useEmiCalculator();
  const { rates, loading, error } = useExchangeRates();

  useEffect(() => {
    calculateEMI(10000, 5, 2);
  }, [calculateEMI]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Exchange Rates & Converted EMI
      </Typography>

      {emi > 0 && (
        <ConvertedEmiTable
          rates={rates}
          emi={emi}
          loading={loading}
          error={error}
        />
      )}
    </Box>
  );
};

export default ExchangeRates;
