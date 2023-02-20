import { Products } from './Products';

export class ProductItem {
  constructor(
    id: string,
    name: string,
    quantity: number,
    img: string,
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.img = img;
    this.price = price;
  }
  id: string;
  name: string;
  quantity: number;
  img: string;
  price: number;
}
