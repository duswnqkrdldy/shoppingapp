import React from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Fab,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const handlePushHomePage = () => navigate("/");
  const handlePushCartPage = () => navigate("/cart");
  const handlePushCreatePage = () => navigate("/create");
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontSize: 26,
                fontWeight: "bold",
                cursor: "pointer",
                flexGrow: 1,
              }}
              onClick={handlePushHomePage}
            >
              온라인 쇼핑몰
            </Typography>
            <Button color="inherit" onClick={handlePushCartPage}>
              <ShoppingCartIcon fontSize="large"></ShoppingCartIcon>
            </Button>
          </Toolbar>
        </AppBar>
        <Container fixed>{children}</Container>
      </Box>
      <Box sx={{ position: "fixed", right: "20px", bottom: "20px" }}>
        <Fab color="primary" onClick={handlePushCreatePage}>
          <CreateIcon />
        </Fab>
      </Box>
    </>
  );
};

export default Layout;
