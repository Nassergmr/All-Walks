export type Product = {
  id: string;
  isAdded: boolean;
  gender: string;
  image: string;
  model: string;
  min_price: number;
  size: number;
  brand: string;
  max_price: number;
  title: string;
  short_description: string;
  created_at: number;
  weekly_orders: number;
  gallery_360: string[] | null;
};
export interface CartItem extends Product {
  size: number;
  quantity: number;
  min_price: number;
}
export type BrandProp = {
  brand: string;
};
