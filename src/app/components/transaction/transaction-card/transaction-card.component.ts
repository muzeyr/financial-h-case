import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent implements OnInit {

  @Input()  cards: Response[];
  public showDiv: boolean;

  constructor() {
    this.showDiv = false;
   }

  ngOnInit(): void {
    this.showDiv = true;

  }

  public randomCss(): string {
    return 'success';
  }
}
