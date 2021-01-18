import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LocalStorageService } from 'ngx-localstorage';
import * as uuid from 'uuid';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  client = new Client();
  clients: Client[] = [];
  products = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    enableCheckAll: false,
  };

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  constructor(private _storageService: LocalStorageService) {}

  ngOnInit(): void {
    this.clients = this._storageService.get('clients') || [];
    this.products = this._storageService.get('products') || [];
  }

  public saveClient(client: Client): void {
    client.itemIds = this.selectedItems.map((item) => item.id);
    this.selectedItems = [];
    this.clients.push(client);
    this.client = new Client();
    this._storageService.set('clients', this.clients);
  }

  public deleteClient(index: number): void {
    this.clients.splice(index, 1);
    this._storageService.set('clients', this.clients);
  }
}

export class Client {
  id: number;
  name: string;
  mobile: string;
  itemIds: string[];

  constructor(id?: number, name?: string, mobile?: string, itemIds?: string[]) {
    this.id = id || uuid.v4();
    this.name = name;
    this.mobile = mobile;
    this.itemIds = itemIds;
  }
}
