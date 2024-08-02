import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { ProductType } from "../type";
import { useCookies } from "react-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import useCart from "../components/useCart";

const CartPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["cart"]);
  const cartItems = cookies.cart as ProductType[];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { carts } = useCart();

  const handlePushHomePage = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handlePurchaseProduct = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const totalPrice = carts.reduce(
    (prev, cur) => prev + cur.price * cur.count,
    0
  );

  return (
    <>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              장바구니
            </Typography>
            {carts.length === 0 ? (
              <Typography variant="body1">
                장바구니에 담긴 상품이 없습니다.
              </Typography>
            ) : (
              carts.map((cart) => <CartItem key={cart.id} cart={cart} />)
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              결제정보
            </Typography>
            <Box sx={{ position: "sticky", top: 20 }}>
              <Card sx={{ padding: 2 }}>
                <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                  총 상품가격: {totalPrice.toLocaleString("KR-ko")}원
                </Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                  총 배송비: 무료
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  총 결제금액: {totalPrice.toLocaleString("KR-ko")}원
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handlePurchaseProduct}
                >
                  결제하기
                </Button>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={isModalOpen}
        onClose={handlePushHomePage}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">구매 성공</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            메인페이지로 이동합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePushHomePage} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartPage;
