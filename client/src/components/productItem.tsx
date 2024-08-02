import { useState } from "react";
import { ProductItemProps } from "../type";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { API_SERVER_DOMAIN } from "./ApiServer";

const ProductItem = ({ product }: ProductItemProps) => {
  const { id, name, price, explanation } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editExplanation, setEditExplanation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);

  const navigate = useNavigate();
  const handlePushProductPage = () => navigate(`/product/${product.id}`);
  const handlePushPurchasePage = () => navigate(`/purchase/${product.id}`);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{ maxWidth: 345, padding: 3, height: 300 }}
        onClick={handlePushProductPage}
      >
        {product.thumbnail && (
          <CardMedia
            sx={{ height: 140 }}
            image={`${API_SERVER_DOMAIN}/${product.thumbnail}`}
            title={product.name}
          />
        )}

        <CardContent sx={{ padding: 0 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="text.secondary"
            sx={{
              height: 30,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.price.toLocaleString("KR-ko")}원
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.explanation}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}
        >
          <Button
            size="small"
            variant="contained"
            color="warning"
            onClick={handlePushPurchasePage}
          >
            구매하기
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
