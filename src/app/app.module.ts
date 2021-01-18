import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBoostrapModule } from './shared/ngx-bootstrap/app-bootstrap.module';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule } from '@angular/forms';
import { SumPipe } from './shared/pipes/sum.pipe';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SumPipe,
    ProductComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppBoostrapModule,
    AccordionModule,
    NgxLocalStorageModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'INR' },
    CurrencyPipe,
    SumPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
