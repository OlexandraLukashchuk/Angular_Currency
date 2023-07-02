import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-header',
  template: `
    <div>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/img1.png" alt="logo" aria-hidden="true">
      </header>

      <p>USD/UAH: {{ usdRate }}</p>
      <p>EUR/UAH: {{ eurRate }}</p>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usdRate: number = 0;
  eurRate: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.getCurrencyData('UAH').subscribe((data: any) => {
      const rates = data?.rates;
      if (rates) {
        this.usdRate = +((1 / rates['USD']).toFixed(2));
        this.eurRate = +((1 / rates['EUR']).toFixed(2));
      }
    });
  }
  

  getCurrencyData(baseCurrency: string) {
    const url = `https://api.exchangerate.host/latest?base=${baseCurrency}`;
    return this.http.get(url).pipe(map((response: any) => response));
  }
}
