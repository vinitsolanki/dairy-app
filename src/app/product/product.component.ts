import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import * as uuid from 'uuid';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product = new Product();
  products: Product[] = [];
  constructor(private _storageService: LocalStorageService) {}

  ngOnInit(): void {
    this.products = this._storageService.get('products') || [];
  }

  public saveProduct(product: Product): void {
    this.products.push(product);
    this.product = new Product();
    this._storageService.set('products', this.products);
  }

  public deleteProduct(index: number): void {
    this.products.splice(index, 1);
    this._storageService.set('products', this.products);
  }
}

export class Product {
  id: string;
  name: string;
  price: number;

  constructor(id?: string, name?: string, price?: number) {
    this.id = id || uuid.v4();
    this.name = name;
    this.price = price;
  }
}
