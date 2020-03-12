import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TransactionClient } from 'src/app/models/transaction/transaction-client';
import { TransactionDetail } from 'src/app/models/transaction/transaction-detail';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-find',
  templateUrl: './transaction-find.component.html',
  styleUrls: ['./transaction-find.component.scss']
})
export class TransactionFindComponent implements OnInit {
  public clientDetail: TransactionDetail;
  public operationLock = false;
  public transactionClient: TransactionClient;

  constructor(private readonly ngxService: NgxUiLoaderService,
              private readonly activatedRouter: ActivatedRoute,
              public toastr: ToastrManager,
              private readonly router: Router,
              private readonly transactionService: TransactionService) {
  }

  public ngOnInit(): void {
    this.activatedRouter.paramMap
      .subscribe(param => {

        this.ngxService.start();

        this.transactionClient = new TransactionClient();
        this.transactionClient.transactionId = param.get('id');

        this.transactionService.get(this.transactionClient).subscribe(data => {

          if (data.status === 'DECLINED') {
            this.toastr.warningToastr(data.message);
            this.router.navigateByUrl('/transaction-query');
            return;
          }

          this.clientDetail = data;
          this.operationLock = true;
          this.ngxService.stop();
        });
    });

  }
}
