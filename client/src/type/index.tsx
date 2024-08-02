export interface ProductType {
  id: string;
  name: string;
  explanation: string;
  price: number;
  thumbnail?: string;
}

export interface ProductItemProps {
  product: ProductType;
}
