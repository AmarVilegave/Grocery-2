import { ProductItem } from './ProductItem';

export class Cart {
  items: ProductItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
}
