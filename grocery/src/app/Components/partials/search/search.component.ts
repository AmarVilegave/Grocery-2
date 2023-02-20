import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Products } from 'src/app/shared/models/Products';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  products: Products[] = [];

  constructor(productService: ProductService) {
    this.products = productService.getAll();
  }

  ngOnInit(): void {}
}
