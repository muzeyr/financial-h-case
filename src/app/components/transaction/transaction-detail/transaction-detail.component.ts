import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MerchantTransaction } from 'src/app/models/merchant/merchant-transaction';
import { TransactionClient } from 'src/app/models/transaction/transaction-client';
import { TransactionDetail } from 'src/app/models/transaction/transaction-detail';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  public showDiv: boolean;
  public merchantTransaction: MerchantTransaction;
  public transactionDetail: TransactionDetail;
  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) info,
              private readonly transactionService: TransactionService,
              private readonly formBuilder: FormBuilder) {
    this.showDiv = false;
    this.merchantTransaction = info;
    this.form = formBuilder.group({
      shippingFirstName: ['', [Validators.required]],
      shippingLastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
    });

  }

  public ngOnInit(): void {
    if (this.merchantTransaction) {
      const transactionID = new TransactionClient();
      transactionID.transactionId = this.merchantTransaction.transactionId;
      this.transactionService.get(transactionID).subscribe(data => {
        this.transactionDetail = data;
        this.form.patchValue(this.transactionDetail.customerInfo);
        this.showDiv = true;

      });
    } else {
      this.showDiv = false;

    }
  }
}
