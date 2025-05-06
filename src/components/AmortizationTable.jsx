import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const AmortizationTable = ({ schedule, currency = "USD", rates }) => {
  if (!schedule?.length) return null;

  const getConvertedValue = (value) => {
    if (currency === "USD" || !rates) return value;
    const rate = rates[currency];
    return rate ? value * rate : value;
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Amortization Schedule ({currency})
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Principal</TableCell>
            <TableCell>Interest</TableCell>
            <TableCell>Remaining Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((row) => (
            <TableRow key={row.month}>
              <TableCell>{row.month}</TableCell>
              <TableCell>
                {getConvertedValue(row.principal).toFixed(2)} {currency}
              </TableCell>
              <TableCell>
                {getConvertedValue(row.interest).toFixed(2)} {currency}
              </TableCell>
              <TableCell>
                {getConvertedValue(row.balance).toFixed(2)} {currency}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AmortizationTable;
