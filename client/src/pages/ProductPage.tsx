import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ProductType } from "../type";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { API_SERVER_DOMAIN } from "../components/ApiServer";
import { Delete, Edit } from "@mui/icons-material";
import useCart from "../components/useCart";
import { getProduct } from "../components/Api";

const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isCModalOpen, setIsCModalOpen] = useState(false);
  const [isDModalOpen, setIsDModalOpen] = useState(false);

  const { addCart } = useCart();

  const handleAddCart = () => {
    if (product) {
      addCart(product.id);
      setIsCModalOpen(true);
    }
  };

  const handlePushPurchasePage = () => {
    if (productId) {
      navigate(`/purchase/${productId}`);
    }
  };

  useEffect(() => {
    if (productId) {
      getProduct(productId).then((response) =>
        setProduct(response.data.product)
      );
    }
  }, [productId]);

  const handlePushCartPage = () => {
    navigate("/cart");
  };

  if (!product) {
    return <h1>찾으시는 상품이 없습니다.</h1>;
  }

  return (
    <>
      <div>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4, mt: 5 }}>
          {product?.thumbnail && (
            <img
              src={`${API_SERVER_DOMAIN}/${product.thumbnail}`}
              alt={product?.name}
              style={{ width: "100%", maxWidth: 400 }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {product.name}
          </Typography>
          <ButtonGroup>
            <Button
              variant="text"
              color="error"
              onClick={() => setIsDModalOpen(true)}
            >
              <Delete />
            </Button>
            <Button variant="text" color="info">
              <Edit />
            </Button>
          </ButtonGroup>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mb: 4 }}>
            {product?.price.toLocaleString("KR-ko")} 원
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {product?.explanation}
          </Typography>
          <ButtonGroup sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleAddCart}>
              장바구니
            </Button>
            <Button variant="contained" onClick={handlePushPurchasePage}>
              구매하기
            </Button>
          </ButtonGroup>
        </Box>
      </div>

      <Dialog
        open={isCModalOpen}
        onClose={() => setIsCModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          장바구니에 등록했습니다.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            장바구니페이지로 이동하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCModalOpen(false)}>아니오</Button>
          <Button onClick={handlePushCartPage} autoFocus>
            예
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDModalOpen}
        onClose={() => setIsDModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          정말로 삭제하시겠습니까?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            이 작업은 되돌릴 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDModalOpen(false)}>아니오</Button>
          <Button autoFocus>예</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductPage;
