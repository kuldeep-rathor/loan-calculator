import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { useEmiCalculator } from "../hooks/useEmiCalculator";
import AmortizationTable from "./AmortizationTable";
import { useExchangeRates } from "../hooks/useExchangeRates";
import ConvertedEmiTable from "./ConvertedEmiTable";

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [termYears, setTermYears] = useState("");
  const [currency, setCurrency] = useState("USD");

  const { emi, schedule, calculateEMI } = useEmiCalculator();
  const { rates, loading, error } = useExchangeRates();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loanAmount || !interestRate || !termYears) return;

    calculateEMI(+loanAmount, +interestRate, +termYears);
  };

  const convertCurrency = (value) => {
    if (currency === "USD" || !rates) return value;
    const rate = rates[currency];
    return rate ? value * rate : value;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
      >
        <TextField
          label="Loan Amount"
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
        />
        <TextField
          label="Interest Rate (%)"
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          required
        />
        <TextField
          label="Term (Years)"
          type="number"
          value={termYears}
          onChange={(e) => setTermYears(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Calculate
        </Button>
      </Box>

      {emi > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Monthly EMI: {currency} {convertCurrency(emi).toFixed(2)}
          </Typography>

          <FormControl sx={{ mt: 2, minWidth: 160 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              label="Currency"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="JPY">JPY</MenuItem>
              <MenuItem value="AUD">AUD</MenuItem>
              <MenuItem value="CAD">CAD</MenuItem>
            </Select>
          </FormControl>

          <AmortizationTable
            schedule={schedule}
            currency={currency}
            rates={rates}
          />

          <ConvertedEmiTable
            emi={emi}
            rates={rates}
            loading={loading}
            error={error}
          />
        </>
      )}
    </Box>
  );
};

export default EmiCalculator;
