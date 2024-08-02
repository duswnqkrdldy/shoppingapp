import { useEffect, useState } from "react";
import ProductItem from "./productItem";
import { ProductType } from "../type";
import { CircularProgress, Grid } from "@mui/material";
import { getProducts } from "./Api";

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then((response) => setProducts(response.data.products))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <CircularProgress sx={{ position: "fixed", left: "50%", top: "50%" }} />
    );

  return (
    <>
      <h2>상품 목록</h2>
      <Grid container spacing={3}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
