import { Component, Input, OnInit } from '@angular/core';
import { Response } from 'src/app/models/general/response';

enum CartType {
  success,
  warning,
  danger,
  dark
}
@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent implements OnInit {

  @Input() cards: Response[];
  public showDiv: boolean;
  public cartType: string[];

  constructor() {

    this.showDiv = false;
  }

  ngOnInit(): void {

    this.showDiv = true;
  }

  public randomCss(): string {

    return CartType[Math.floor(Math.random() * Math.floor(2))];
  }
}
