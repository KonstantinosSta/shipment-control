import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Package } from './shipment';
import { findIndex } from 'lodash';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ShipmentService {
  private sPackages = [];
  shipmentUrl = 'http://localhost:3000/shipment';

  constructor(private http: Http) { }

  getPackages(): Package[] {
    return this.sPackages;
  }

  addPackage(sPackage: Package) {
    this.sPackages.push(sPackage);
    return this.sPackages.length;
  }

  getTotalWeight() {
    const totalWeight = this.sPackages.reduce(
      (a, b) => a + b.weight,
      0
    );
    if (totalWeight > 25) {
      alert('The sum of all packages must not exceed 25 KG');
      return totalWeight;
    } else {
      return totalWeight;
    }
  }

  convertCurrency(sPackage: Package) {
    const curr = sPackage.currency;
    return curr;
  }

  deletePackage(sPackage: Package) {
    this.sPackages.splice(this.sPackages.indexOf(sPackage), 1);
  }

  createShipment(sPackages: Package[]): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.shipmentUrl, sPackages, options);
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

  // updatePackage(sPackage: Package) {
  //   const index = findIndex(this.sPackages, (p: Package) => {
  //     return p.name === sPackage.name;
  //   });
  //   this.sPackages[index] = sPackage;
  // }

}
