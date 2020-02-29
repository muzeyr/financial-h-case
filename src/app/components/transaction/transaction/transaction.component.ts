import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { TransactionClient } from 'src/app/models/transaction/transaction-client';
import { TransactionDetail } from 'src/app/models/transaction/transaction-query';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  public form: FormGroup;
  public clientDetail: TransactionDetail;
  public operationLock = false;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly ngxService: NgxUiLoaderService,
              private readonly transactionService: TransactionService) {
      this.form = formBuilder.group({
        transaction: ['', [Validators.required]],
      });
    }

  public ngOnInit(): void {
    this.ngxService.start();
    const client = new TransactionClient();
    client.transactionId = '1011028-1539357144-1293';
    this.transactionService.get(client).subscribe(data => {
      this.clientDetail = data;
      console.log(data);
      this.operationLock = true;
      this.ngxService.stop();
    });
  } 
}
