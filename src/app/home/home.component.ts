import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { DateTime } from 'luxon';
import { Product } from '../product/product.component';
import { CurrencyPipe } from '@angular/common';
import { SumPipe } from '../shared/pipes/sum.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  clients: any[] = [];
  orders = [];
  products: Product[] = [];
  constructor(
    private _storageService: LocalStorageService,
    private currencyPipe: CurrencyPipe,
    private sumPipe: SumPipe
  ) {}

  ngOnInit() {
    this.products = this._storageService.get('products') || [];
    this.clients = this._storageService.get('clients') || [];
    this.clients.forEach((client) => {
      const existingOrders = this._storageService.get(
        this.getOrderStorageKey(client.id)
      );
      if (existingOrders && existingOrders.length > 0) {
        client.products = existingOrders;
      } else {
        client.products = this.getProductsByIds(client.itemIds);
        client.products.forEach((product) => {
          product.quantity = 0;
          product.itemTotal = 0;
        });
      }
    });
  }

  changeQuantity(order) {
    order.itemTotal = order.price * order.quantity;
  }

  saveOrders(customerId: string, orders: any) {
    this._storageService.set(
      JSON.stringify(new MapKey(DateTime.local(), customerId)),
      orders
    );
  }

  public getOrderStorageKey(customerId: string): string {
    return JSON.stringify(new MapKey(DateTime.local(), customerId));
  }

  getProductsByIds(ids: string[]): Product[] {
    return this.products.filter((product) => ids.indexOf(product.id) > -1);
  }

  public sendMessage(client: any) {
    this.saveOrders(client.id, client.products);

    const orderToday = client.products.filter(
      (product) => product.quantity > 0
    );
    const LINE_BREAK = '%0a';

    let message = `*${DateTime.local().toFormat(
      'dd-MM-yyyy'
    )}'s Order* ${LINE_BREAK}`;
    orderToday.forEach((order) => {
      message += `${order.name} (${
        order.quantity
      } x ${this.currencyPipe.transform(
        order.price
      )}) = ${this.currencyPipe.transform(order.itemTotal)} ${LINE_BREAK}`;
    });
    message += `Total : *${this.currencyPipe.transform(
      this.sumPipe.transform(orderToday, 'itemTotal')
    )}*`;

    window.open(
      `https://api.whatsapp.com/send/?phone=91${client.mobile}&text=${message}`,
      '_blank'
    );
  }
}

export class MapKey {
  public date: DateTime;
  public customerId: string;

  constructor(date: DateTime, customerId: string) {
    this.date = date.toISODate();
    this.customerId = customerId;
  }
}
