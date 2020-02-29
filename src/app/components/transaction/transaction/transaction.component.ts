import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { TransactionClient } from 'src/app/models/transaction/transaction-client';
import { TransactionDetail } from 'src/app/models/transaction/transaction-query';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  public form: FormGroup;
  public clientDetail: TransactionDetail;
  constructor(private readonly formBuilder: FormBuilder,
              private readonly transactionService: TransactionService) {
                this.form = formBuilder.group({
                  transaction: ['', [Validators.required]],
                });
    }

  public ngOnInit(): void {
  }
  public applyFilter(): void {

    if (!this.form.valid) {
     // this.toastr.errorToastr('Please check required field', 'Valitadion error');
    } else {
      const client = new TransactionClient();
      client.transactionId = this.form.value.transaction;
      this.transactionService.get(client).subscribe(data => {
        this.clientDetail = data;
      });

    }
  }
}