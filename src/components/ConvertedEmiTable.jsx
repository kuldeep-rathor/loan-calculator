import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { useState } from "react";

const ConvertedEmiTable = ({ rates, emi, loading, error }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  if (!emi || emi <= 0) return null;
  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  const rateEntries = Object.entries(rates);
  const paginatedRates = rateEntries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        EMI in Other Currencies
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell>Converted EMI</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRates.map(([currency, rate]) => (
            <TableRow key={currency}>
              <TableCell>{currency}</TableCell>
              <TableCell>{(emi * rate).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={rateEntries.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]} // Fixed to 10 per page
      />
    </TableContainer>
  );
};

export default ConvertedEmiTable;
