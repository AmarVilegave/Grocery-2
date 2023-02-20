import { Injectable } from '@angular/core';
import { sample_Products } from 'src/data';
import { Products } from '../shared/models/Products';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Products = this.getProductFromLocalStorage();
  productSubject: BehaviorSubject<Products> = new BehaviorSubject(
    this.products
  );
  private favorite: boolean = false;
  private show: boolean = false;
  private subject = new Subject<any>();
  private wishlist = new Subject<any>();

  constructor() {}

  // onAdd() {
  //   this.show = !this.show;
  //   this.subject.next(this.show);
  //   console.log(this.show);
  // }

  onAdd(id: string) {
    console.log(this.products);
  }

  getProductFromLocalStorage(): Products {
    const productJson = localStorage.getItem('Products');
    return productJson ? JSON.parse(productJson) : new Products();
  }

  getProductObservable() {
    return this.productSubject.asObservable();
  }

  setProductFromLocalStorage(): void {}

  onMinus() {
    this.show = !this.show;
    this.subject.next(this.show);
    console.log(this.show);
  }

  onAddToggle() {
    return this.subject.asObservable();
  }

  onFavorite() {
    this.favorite = !this.favorite;
    this.wishlist.next(this.favorite);
  }

  onWishlist() {
    return this.wishlist.asObservable();
  }

  getAll(): Products[] {
    return sample_Products;
  }
}
