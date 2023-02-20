import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/shared/models/Products';
import { ProductService } from 'src/app/Services/product.service';
import { AddService } from 'src/app/Services/add.service';
import { Subscription, Subject } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  cart!: Cart;
  show: boolean = false;
  subscription: Subscription;
  wishlisted: Subscription;
  quantity: number = 1;
  favorite: boolean;
  products: Products[] = [];
  constructor(
    private productService: ProductService,
    private addService: AddService
  ) {
    this.products = productService.getAll();
    this.subscription = this.productService
      .onAddToggle()
      .subscribe((value) => (this.show = value));
    this.wishlisted = productService
      .onWishlist()
      .subscribe((value) => (this.favorite = value));
    this.addService
      .getObservable()
      .subscribe((product) => (this.cart = product));
  }

  ngOnInit(): void {
    console.log(this.products);
  }

  onClick(product: Products) {
    this.addService.onAdd(product);
    this.products.forEach((ele) => {
      if (ele.id === product.id) ele.quantity--;
    });
    console.log(this.products);
  }

  // onMinus() {
  //   if (this.quantity === 1) {
  //     this.productService.onMinus();
  //   } else {
  //     this.quantity--;
  //   }
  // }

  onMinus(id: string, quantity: number) {
    this.addService.onMinus(id);
  }

  onPlus(id: string, quantity: number) {
    this.addService.onPlus(id, quantity);
    console.log(this.products);
  }

  checkPlusQuantity(id: string) {
    console.log('Ae alo re');
  }

  onWishlisted() {
    this.productService.onFavorite();
  }

  // test(productId: string, qua: number) {
  //   let item = this.products.filter((list) => list.id === productId);
  //   if (!item) return;
  //   if (qua === this.quantity) return;
  //   this.quantity++;
  // }
  productExist(id: string) {
    let product = this.cart.items.find((ele) => ele.id === id);
    if (product) return true;
    else return false;
  }

  prodQuantity(id: string) {
    let product = this.cart.items.find((ele) => ele.id === id);
    if (product) return product.quantity;
    else return '';
  }
}
