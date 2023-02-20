import { Injectable } from '@angular/core';
import { ProductItem } from '../shared/models/ProductItem';
import { Products } from '../shared/models/Products';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart';
import { ProductService } from './product.service';
@Injectable({
  providedIn: 'root',
})
export class AddService {
  products: Products[] = [];
  cart: Cart = this.addItemFromLocalStorage();
  cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor(private productService: ProductService) {
    this.products = this.productService.getAll();
  }

  onAdd(item: Products) {
    this.cart.items.push(
      new ProductItem(item.id, item.name, 1, item.image, item.price)
    );
    this.cart.totalQuantity = 1;
    this.setProductToLocalStorage();
  }

  onPlus(id: string, quantity: number) {
    if (quantity === 0) return;
    else {
      this.cart.items.forEach((ele) => {
        console.log(ele);
        if (ele.id === id) {
          ele.quantity++;
        }
      });
      this.setProductToLocalStorage();
      this.products.forEach((ele) => {
        if (ele.id === id) {
          ele.quantity--;
        }
      });
    }
  }

  onMinus(id: string) {
    let product = this.cart.items.find((ele) => ele.id === id);
    if (product?.quantity === 1) {
      this.cart.items = this.cart.items.filter((item) => item.id !== id);
      this.products.forEach((ele) => {
        if (ele.id === id) {
          ele.quantity++;
        }
      });
      this.setProductToLocalStorage();
      return;
    } else {
      this.cart.items.forEach((ele) => {
        if (ele.id === id) {
          ele.quantity--;
        }
      });
      this.setProductToLocalStorage();
      this.products.forEach((ele) => {
        if (ele.id === id) {
          ele.quantity++;
        }
      });
    }
  }

  setProductToLocalStorage(): void {
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  getObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  addItemFromLocalStorage() {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
