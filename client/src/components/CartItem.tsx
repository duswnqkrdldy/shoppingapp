import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ProductType } from "../type";
import { API_SERVER_DOMAIN } from "./ApiServer";
import { Add, Delete, Remove } from "@mui/icons-material";
import useCart from "./useCart";

type Props = {
  cart: ProductType & { count: number };
};

const CartItem = ({ cart }: Props) => {
  const { changeCount, deleteCarts } = useCart();
  return (
    <Card sx={{ display: "flex", marginBottom: 2 }}>
      {cart.thumbnail && (
        <CardMedia
          sx={{ width: 100 }}
          image={`${API_SERVER_DOMAIN}/${cart.thumbnail}`}
          title={cart.name}
        />
      )}
      <CardContent sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {cart.name}
        </Typography>
        <Typography variant="h6" fontSize={14} color={"#888888"}>
          {cart.price.toLocaleString("KR-ko")}원
        </Typography>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <IconButton onClick={() => changeCount(cart.id, "decrease")}>
              <Remove />
            </IconButton>
            {cart.count}
            <IconButton onClick={() => changeCount(cart.id, "increase")}>
              <Add />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={() => deleteCarts(cart.id)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;
