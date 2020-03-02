import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { TransactionClient } from 'src/app/models/transaction/transaction-client';
import { TransactionDetail } from 'src/app/models/transaction/transaction-query';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-transaction-find',
  templateUrl: './transaction-find.component.html',
  styleUrls: ['./transaction-find.component.scss']
})
export class TransactionFindComponent implements OnInit {
  public clientDetail: TransactionDetail;
  public operationLock = false;

  constructor(private readonly ngxService: NgxUiLoaderService,
              private readonly activatedRouter: ActivatedRoute,
              public toastr: ToastrManager,
              private readonly router: Router,
              private readonly transactionService: TransactionService) {
    }

  public ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(params => {
      this.ngxService.start();
      const client = new TransactionClient();
      client.transactionId = params.get('id');
      this.transactionService.get(client).subscribe(data => {
        if (data.status === 'DECLINED') {
          this.toastr.warningToastr(data.message);
          this.router.navigateByUrl('/transaction-query');
          return;

        }
        this.clientDetail = data;
        this.operationLock = true;
        this.ngxService.stop();
      });
    }, error => {
      this.ngxService.stop();
      this.operationLock = false;
      this.router.navigateByUrl('/transaction-query');
    });
  }
}
