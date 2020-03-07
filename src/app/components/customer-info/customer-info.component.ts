import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerInfo } from 'src/app/models/general/customer-info';
@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {


  public showDiv: boolean;
  public customerInfo: CustomerInfo;


  constructor(@Inject(MAT_DIALOG_DATA) info) {
    this.showDiv = false;
    this.customerInfo = info;
   }

  public ngOnInit(): void {
    if (this.customerInfo) {
      this.showDiv = true;
    } else {
      this.showDiv = false;

    }
  }

}
