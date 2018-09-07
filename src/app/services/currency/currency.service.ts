import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CurrencyService {

  constructor(public http: Http) { }

  getCurrency() {
    return this.http.get('http://api.fixer.io/latest?symbols=USD,GBP')
      .map(res => res.json());
  }

}
