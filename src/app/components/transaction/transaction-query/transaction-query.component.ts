import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomerInfo } from 'src/app/models/general/customer-info';
import { Pageable } from 'src/app/models/general/pageable';
import { MerchantClient } from 'src/app/models/merchant/merchant-client';
import { MerchantTransaction } from 'src/app/models/merchant/merchant-transaction';
import { TransactionDetail } from 'src/app/models/transaction/transaction-detail';
import { TransactionQuery } from 'src/app/models/transaction/transaction-query';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

import { TransactionRequest } from '../../../models/transaction/transaction-request';
import { CustomerInfoComponent } from '../../customer-info/customer-info.component';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

export class SelectModal {
  public uuid: string;
  public label: string;
}
@Component({
  selector: 'app-transaction-query',
  templateUrl: './transaction-query.component.html',
  styleUrls: ['./transaction-query.component.scss']
})
export class TransactionQueryComponent implements OnInit {
  public form: FormGroup;
  public req: TransactionRequest;
  public response: TransactionQuery;
  public showTable: boolean;
  public pageSize: number;
  public pageIndex: number;
  public lowValue: number;
  public highValue: number;
  public page: Pageable;
  public totalElement: number;
  public displayedColumns: string[] = ['name', 'transaction', 'client', 'status'];
  public statusSelect: SelectModal[] =
    [
      { uuid: 'APPROVED', label: 'APPROVED' },
      { uuid: 'WAITING', label: 'WAITING' },
      { uuid: 'DECLINED', label: 'DECLINED' },
      { uuid: 'ERROR', label: 'ERROR' }
    ];
  public operationSelect: SelectModal[] =
    [
      { uuid: 'DIRECT', label: 'DIRECT' },
      { uuid: 'REFUND', label: 'REFUND' },
      { uuid: '3D', label: '3D' },
      { uuid: '3DAUTH', label: '3DAUTH' },
      { uuid: 'STORED', label: 'STORED' }
    ];
  public paymentMethodSelect: SelectModal[] =
    [
      { uuid: 'CREDITCARD', label: 'CREDITCARD' },
      { uuid: 'CUP', label: 'CUP' },
      { uuid: 'IDEAL', label: 'IDEAL' },
      { uuid: 'GIROPAY', label: 'GIROPAY' },
      { uuid: 'STORED', label: 'STORED' },
      { uuid: 'MISTERCASH', label: 'MISTERCASH' },
      { uuid: 'PAYTOCARD', label: 'PAYTOCARD' },
      { uuid: 'CEPBANK', label: 'CEPBANK' },
      { uuid: 'CITADEL', label: 'CITADEL' },
    ];
  public filterSelect: SelectModal[] =
    [
      { uuid: 'Transaction UUID', label: 'Transaction UUID' },
      { uuid: 'Customer Email', label: 'Customer Email' },
      { uuid: 'Reference No', label: 'Reference No' },
      { uuid: 'Custom Data', label: 'Custom Data' },
      { uuid: 'Card PAN', label: 'Card PAN' }
    ];

  public dataSource = new MatTableDataSource<TransactionDetail>();


  constructor(private readonly transactionService: TransactionService,
              private readonly calendar: NgbCalendar,
              private readonly datePipe: DatePipe,
              private readonly ngxService: NgxUiLoaderService,
              public toastr: ToastrManager,
              private readonly formBuilder: FormBuilder,
              public dialog: MatDialog,
              private readonly router: Router,
              public formatter: NgbDateParserFormatter) {
    this.showTable = false;
    const firtDate = new Date();
    firtDate.setDate(firtDate.getDate() - 10000);

    this.form = formBuilder.group({
      fromDate: [this.datePipe.transform(firtDate, 'yyyy-MM-dd'), [Validators.required]],
      toDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
      status: new FormControl(),
      operation: new FormControl(),
      paymentMethod: new FormControl(),
      errorCode: new FormControl(),
      filterField: new FormControl(),
      transaction: new FormControl(),
      filterValue: new FormControl(),
      name: new FormControl()
    });

  }

  public ngOnInit(): void {
    this.applyFilter();
  }

  public serverdata = (event?: PageEvent) => {

    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    } else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    } else {

    }
    this.pageIndex = event.pageIndex;
    this.pageList(event.pageIndex, event.pageSize, false);
    return event;
  }
  public pageList = (page: number, size: number, first: boolean) => {
    this.ngxService.start();
    this.req = new TransactionRequest();
    this.req.fromDate = this.form.value.fromDate;
    this.req.toDate = this.form.value.toDate;
    this.req.status = this.form.value.status;
    this.req.page = page;
    this.dataSource.data = [];
    this.transactionService.list(this.req).subscribe(data => {
      this.response = data;
      this.dataSource.data = this.response.data;
      if (this.response.data.length > 0) {
        this.showTable = true;
      }
      this.ngxService.stop();
    });
  }
  public applyFilter(): void {
    if (!this.form.valid) {
      this.showTable = true;
      return;
    }
    this.req = new TransactionRequest();
    this.req.fromDate = this.form.value.fromDate;
    this.req.toDate = this.form.value.toDate;
    this.req.status = this.form.value.status;
    this.req.filterField = this.form.value.filterField;
    this.req.filterValue = this.form.value.filterValue;
    this.req.operation = this.form.value.operation;
    this.req.paymentMethod = this.form.value.paymentMethod;
    this.totalElement = 850;
    this.ngxService.start();
    this.transactionService.list(this.req).subscribe(data => {
      this.response = data;
      this.dataSource.data = this.response.data;
      if (this.response.data.length > 0) {
        this.showTable = true;
      } else {
        this.toastr.warningToastr('No Records Found', 'No Data');
      }
      this.ngxService.stop();

    }, error => {
      this.ngxService.stop();
    });
  }
  client(item: MerchantClient) {
    this.router.navigateByUrl('/transaction/' + item.transactionId);
  }
  openDialog(info: CustomerInfo) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = info;
    const dialogRef = this.dialog.open(CustomerInfoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openDialogTransaction(transaction: MerchantTransaction) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = transaction;
    const dialogRef = this.dialog.open(TransactionDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  setStyle(it: any, item: MerchantTransaction): string {
    if (item.status === 'APPROVED') {
      return 'success';
    } else if (item.status === 'ERROR') {
      return 'errorT';
    } else if (item.status === 'DECLINED') {
      return 'warning';
    } else {
      if ((it % 2) === 0) {
        return 'zebra';
      } else {
        return '';
      }
    }
  }


}
