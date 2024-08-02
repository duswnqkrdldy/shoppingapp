import { Cookies, useCookies } from "react-cookie";
import { ProductType } from "../type";
import { useEffect, useMemo, useState } from "react";
import { getProduct } from "./Api";

type CartType = ProductType & { count: number };

const COOKIE_KEY = "cart";

const useCart = () => {
  const [cookies, setCookies] = useCookies([COOKIE_KEY]);
  const [carts, setCarts] = useState<CartType[]>([]);

  const productIds = useMemo(
    () => (cookies[COOKIE_KEY] as string[]) ?? [],
    [cookies]
  );
  const addCart = (id: string) => {
    const nextCartIds = [...productIds, id];

    setCookies(COOKIE_KEY, nextCartIds, { path: "/" });
  };

  const getProductById = (id: string) => {
    return fetch(`/product/${id}`).then((response) => response.json());
  };

  useEffect(() => {
    if (productIds && productIds.length) {
      const requestList: Array<Promise<any>> = [];
      const requestIds = productIds.reduce(
        (acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1),
        new Map<string, number>()
      );

      Array.from(requestIds.keys()).forEach((id) => {
        requestList.push(getProduct(id));
      });

      Promise.all(requestList).then((responseList) => {
        const cartData: CartType[] = responseList.map((response) => ({
          ...response.data.product,
          count: requestIds.get(response.data.product.id),
        }));
        setCarts(cartData);
      });
    }
  }, [productIds]);

  const changeCount = (productId: string, mode: "increase" | "decrease") => {
    const index = productIds.indexOf(productId);
    if (index === -1) {
      return;
    }

    if (mode === "decrease") {
      const tempArr = [...productIds];
      tempArr.splice(index, 1);
      if (!tempArr.includes(productId)) return; // 마이너스 값으로 안내려가게 함

      setCookies(COOKIE_KEY, tempArr, {
        path: "/",
      });
    }

    if (mode === "increase") {
      setCookies(COOKIE_KEY, [...productIds, productId], {
        path: "/",
      });
    }
  };

  const deleteCarts = (id: string) => {
    console.log(productIds);
    console.log(id);

    const nextCarts = productIds.filter((productIds) => productIds !== id);
    setCookies(COOKIE_KEY, nextCarts, { path: "/" });
    if (nextCarts.length === 0) window.location.reload();
  };

  return { carts, addCart, changeCount, deleteCarts };
};

export default useCart;
