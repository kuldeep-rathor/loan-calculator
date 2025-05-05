import { AppBar, Toolbar, Typography, Switch } from "@mui/material";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Loan Calculator
        </Typography>

        <Link to="/" style={{ color: "white", marginRight: "1rem" }}>
          Home
        </Link>
        <Link
          to="/exchange-rates"
          style={{ color: "white", marginRight: "1rem" }}
        >
          Exchange Rates (Live)
        </Link>
        <Link to="/about" style={{ color: "white", marginRight: "1rem" }}>
          About
        </Link>
        <Link
          to="/invalid-route"
          style={{ color: "white", marginRight: "1rem" }}
        >
          Error Page
        </Link>

        <Switch checked={mode === "dark"} onChange={toggleTheme} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
