import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent implements OnInit {

  @Input()  cards: Response[];
  public showDiv: boolean;
  public cartType: string[];

  constructor() {
    this.showDiv = false;
    this.cartType = ['success', 'warning', 'danger', 'dark'];
   }

  ngOnInit(): void {
    this.showDiv = true;

  }

  public randomCss(): string {
    return this.cartType[Math.floor(Math.random() * Math.floor(2))];
  }
}
