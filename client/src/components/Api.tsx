import { ProductType } from "../type";
import axios, { AxiosResponse } from "axios";
type ReturnType<T> = Promise<AxiosResponse<T>>;

export const getProducts = async (): ReturnType<{
  products: ProductType[];
}> => {
  try {
    const response = await axios.get(`/product`);
    return response;
  } catch (error) {
    throw error;
  }
  // trycatch말고 이것도 사용 가능
  //   return fetch(`/product`)
  //     .then((response) => response.json())
  //     .then((data) => data.products);
};

export const getProduct = async (
  id: string
): ReturnType<{
  product: ProductType;
}> => {
  try {
    const response = await axios.get(`/product/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (
  newProduct: Omit<ProductType, "id" | "thumbnail">
): ReturnType<{ product: ProductType }> => {
  try {
    const response = await axios.post(`/product`, newProduct);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`/product/${id}`);
    return response;
  } catch (error) {
    throw error;
  }

  //  return fetch(`/product/${id}`, { method: "DELETE" });
};

export const modifyProduct = async (updateProduct: ProductType) => {
  try {
    const response = await axios.patch(
      `/product/${updateProduct.id}`,
      updateProduct
    );
    return response;
  } catch (error) {
    throw error;
  }

  //   const formData = new FormData();
  //   return fetch(`/product/${updateProduct.id}`, {
  //     method: "PATCH",
  //     headers: { "ConTent-Type": "application/json" },
  //     body: JSON.stringify(updateProduct),
  //   });
};

export const modifyThumbnail = async (
  productId: string,
  thumbnail: File
): ReturnType<{ product: ProductType }> => {
  try {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    const response = axios.patch(`/product/thumbnail/${productId}`, formData);
    return response;
  } catch (error) {
    throw error;
  }

  //   const formData = new FormData();
  //   formData.append("thumbnail", thumbnail);
  //   return fetch(`/product/thumbnail/${productId}`, {
  //     method: "PATCH",
  //     body: formData,
  //   });
};
