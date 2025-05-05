import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Switch,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Exchange Rates (Live)", path: "/exchange-rates" },
    { label: "About", path: "/about" },
    { label: "Error Page", path: "/invalid-route" },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box sx={{ width: 250 }} role="presentation">
                  <List>
                    {navLinks.map((link) => (
                      <ListItem
                        button
                        key={link.path}
                        component={Link}
                        to={link.path}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <ListItemText primary={link.label} />
                      </ListItem>
                    ))}
                    <ListItem>
                      <Switch
                        checked={mode === "dark"}
                        onChange={toggleTheme}
                      />
                      <ListItemText
                        primary={mode === "dark" ? "Dark" : "Light"}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{ color: "white", marginRight: "1rem" }}
                >
                  {link.label}
                </Link>
              ))}
              <Switch checked={mode === "dark"} onChange={toggleTheme} />
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
