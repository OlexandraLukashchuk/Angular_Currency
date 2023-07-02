import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-home',
  template: `
  <section class="header">
  <app-header></app-header>
</section>
<section class="converter-section">
<div class="text"><h1>Курс Валют:</h1></div>
  <div class="converter-column">
    <input type="number" [(ngModel)]="amount1" (input)="convertCurrency(1)" placeholder="Amount">
    <select [(ngModel)]="currency1" (change)="convertCurrency(1)">
      <option value="UAH">UAH</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="PLN">PLN</option>
    </select>
  </div>
  <div class="converter-column">
    <input type="number" [(ngModel)]="amount2" (input)="convertCurrency(2)" placeholder="Amount">
    <select [(ngModel)]="currency2" (change)="convertCurrency(2)">
      <option value="UAH">UAH</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="PLN">PLN</option>
    </select>
  </div>
</section>

  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  amount1: number = 1;
  currency1: string = 'UAH';
  amount2: number = 1;
  currency2: string = 'UAH';

  constructor(private http: HttpClient) {}

  convertCurrency(input: number) {
    let baseCurrency: string, targetCurrency: string, amount: number;

    if (input === 1) {
      baseCurrency = this.currency1;
      targetCurrency = this.currency2;
      amount = this.amount1;
    } else {
      baseCurrency = this.currency2;
      targetCurrency = this.currency1;
      amount = this.amount2;
    }

    if (baseCurrency !== targetCurrency) {
      this.getCurrencyData(baseCurrency).subscribe((data: any) => {
        const rates = data?.rates;
        if (rates) {
          const exchangeRate = rates[targetCurrency];
          if (exchangeRate) {
            if (input === 1) {
              this.amount2 = parseFloat((amount * exchangeRate).toFixed(3));
            } else {
              this.amount1 = parseFloat((amount * exchangeRate).toFixed(3));
            }
          }
        }
      });
    }
  }

  getCurrencyData(baseCurrency: string) {
    const url = `https://api.exchangerate.host/latest?base=${baseCurrency}`;
    return this.http.get(url).pipe(map((response: any) => response));
  }
}
