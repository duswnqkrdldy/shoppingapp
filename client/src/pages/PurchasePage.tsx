import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { API_SERVER_DOMAIN } from "../components/ApiServer";
import { useEffect, useState } from "react";
import { ProductType } from "../type";
import { useParams } from "react-router-dom";
import PurchaseForm from "../components/PurchaseForm";
import { getProduct } from "../components/Api";

type ParamsType = {
  productId: string;
};

const PurchasePage = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const { productId } = useParams<ParamsType>();

  useEffect(() => {
    if (productId) {
      getProduct(productId).then((response) =>
        setProduct(response.data.product)
      );
    }
  }, [productId]);

  if (!product) return <h1>찾으시는 상품이 없습니다.</h1>;

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        구매하기
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ display: "flex", marginBottom: 2, boxShadow: "none" }}>
            {product?.thumbnail && (
              <CardMedia
                image={`${API_SERVER_DOMAIN}/${product?.thumbnail}`}
                title={product?.name}
                sx={{ width: 100, height: 100, marginRight: 2 }}
              />
            )}
            <CardContent>
              <Typography variant="h6">{product?.name}</Typography>
            </CardContent>
          </Card>
          <PurchaseForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PurchasePage;
