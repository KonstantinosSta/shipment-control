import { CurrencyService } from './../../services/currency/currency.service';
import { ShipmentService } from './shipment.service';
import { Package } from './shipment';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupName,
  Validators
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { clone } from 'lodash';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as fx from 'money/money.js';

@Component({
  selector: 'app-shipment',
  templateUrl: 'shipment.component.html'
})

export class ShipmentComponent implements OnInit {
  packages: Package[];
  packageForm = false;
  editPackageForm = false;
  isNewForm: boolean;
  isEmptyShipment = true;
  newPackage: any = {};
  editedPackage: any = {};
  myForm: FormGroup;
  currencies: string[] = [
    'EUR',
    'GBP',
    'USD',
  ];
  totalWeight = 0;
  totalValue = 0;
  curr = '';
  statusCode: number;

  constructor(
    private _shipmentService: ShipmentService,
    private fb: FormBuilder,
    private _currencyService: CurrencyService,
    private _http: Http) {

    this.myForm = this.fb.group({
      name: ['', [ Validators.required, Validators.maxLength(32)]],
      weight: [null, Validators.required],
      value: [null, Validators.required],
      currency: [null, Validators.required]
    });

   }

  ngOnInit() {
    this.getPackages();
  }

  getPackages() {
    this.packages = this._shipmentService.getPackages();
  }

  getTotalWeight() {
    this.totalWeight = this._shipmentService.getTotalWeight();
    if (this.totalWeight > 25) {
      this.isEmptyShipment = true;
    } else {
      this.isEmptyShipment = false;
    }
  }

  convertIt(sPackage: Package) {
    this.curr = this._shipmentService.convertCurrency(sPackage);
    this._currencyService.getCurrency().subscribe((res) => {
      fx.rates = res.rates;
      fx.base = res.base;
      const result = fx(sPackage.value).from(this.curr).to(res.base);
      this.totalValue += result;
    });
  }

  showAddPackageForm() {
    if (this.packages.length < 5) {
    this.packageForm = true;
    this.isNewForm = true;
    } else {
      alert('max packages reached');
    }
  }

  savePackage(sPackage: Package) {
    if (this.isNewForm) {
      this._shipmentService.addPackage(sPackage);
      this.convertIt(sPackage);
      this.getTotalWeight();
    }
    this.packageForm = false;
    this.newPackage = {};
  }

  removePackage(sPackage: Package) {
    this._shipmentService.deletePackage(sPackage);
    this.totalWeight -= sPackage.weight;
    this.totalValue -= sPackage.value;
  }

  cancelNewPackage() {
    this.newPackage = {};
    this.packageForm = false;
  }

  sendShipment(packages) {
    this._shipmentService.createShipment(packages)
      .subscribe(successCode => {
        this.statusCode = successCode;
        // this.getPackages();
      },
      errorCode => this.statusCode = errorCode
      );
  }

  // updatePackage() {
  //   this._shipmentService.updatePackage(this.editedPackage);
  //   this.editPackageForm = false;
  //   this.editedPackage = {};
  // }

  // showEditPackageForm(sPackage: Package) {
  //   if (!sPackage) {
  //     this.packageForm = false;
  //     return;
  //   }
  //   this.isNewForm = true;
  //   this.editPackageForm = true;
  //   this.editedPackage = clone(sPackage);
  // }

  // cancelEdits() {
  //   this.editedPackage = {};
  //   this.editPackageForm = false;
  // }

}
