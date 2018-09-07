import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { CurrencyService } from './services/currency/currency.service';
import { ShipmentService } from './components/shipment/shipment.service';
import { ShipmentComponent } from './components/shipment/shipment.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipmentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ShipmentService,
    CurrencyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
