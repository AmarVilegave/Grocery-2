import { Component, OnInit } from '@angular/core';
import { AddService } from 'src/app/Services/add.service';
import { ProductService } from 'src/app/Services/product.service';
import { Cart } from 'src/app/shared/models/cart';
import { Products } from 'src/app/shared/models/Products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: Cart;
  products: Products[] = [];
  constructor(
    private addService: AddService,
    private productService: ProductService
  ) {
    this.products = this.productService.getAll();
    this.addService
      .getObservable()
      .subscribe((product) => (this.cart = product));
  }

  ngOnInit(): void {}

  onPlus(id: string, quantity: number) {
    this.addService.onPlus(id, quantity);
  }

  onMinus(id: string) {
    this.addService.onMinus(id);
  }

  prodQuantity(id: string) {
    let product = this.cart.items.find((ele) => ele.id === id);
    if (product) return product.quantity;
    else return '';
  }

  check(id: string) {
    let product = this.cart.items.find((ele) => ele.id === id);
    if (product) return true;
    return false;
  }
}
