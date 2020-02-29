import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { TransactionReport } from 'src/app/models/transaction/transaction-report';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TransactionRequest } from '../../../models/transaction/transaction-request';
import { TransactionQuery, TransactionDetail, MerchantTransaction } from 'src/app/models/transaction/transaction-query';
import { TransactionClient } from 'src/app/models/transaction/transaction-client';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from 'src/app/models/general/pageable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomerInfo } from './../../../models/transaction/transaction-query';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TransactionDetailComponent } from '../../transaction-detail/transaction-detail.component';
import { CustomerInfoComponent } from '../../customer-info/customer-info.component';

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
  public displayedColumns: string[] = ['name', 'transaction', 'status'];
  public statusSelect: SelectModal[] =
    [
      { uuid: 'APPROVED', label: 'APPROVED' },
      { uuid: 'WAITING', label: 'WAITING' },
      { uuid: 'DECLINED', label: 'DECLINED' },
      { uuid: 'ERROR', label: 'ERROR' }
    ];
  public dataSource = new MatTableDataSource<TransactionDetail>();


  constructor(private readonly transactionService: TransactionService,
              private readonly calendar: NgbCalendar,
              private readonly datePipe: DatePipe,
              private readonly ngxService: NgxUiLoaderService,
              private readonly formBuilder: FormBuilder,
              public dialog: MatDialog,
              public formatter: NgbDateParserFormatter) {
    this.showTable = false;
    const firtDate = new Date();
    firtDate.setDate(firtDate.getDate() - 10000);

    this.form = formBuilder.group({
      fromDate: [this.datePipe.transform(firtDate, 'yyyy-MM-dd'), [Validators.required]],
      toDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
      status: ['', [Validators.required]],
      transaction: ['', [Validators.required]],
      name: [''],
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
     // this.toastr.errorToastr('Please check required field', 'Valitadion error');
      return;
    }
    this.req = new TransactionRequest();
    this.req.fromDate = this.form.value.fromDate;
    this.req.toDate = this.form.value.toDate;
    this.req.status = this.form.value.status;
    this.totalElement = 1000;
    this.ngxService.start();
    this.transactionService.list(this.req).subscribe(data => {
      this.response = data;
      this.dataSource.data = this.response.data;
      console.log(this.response);
      if (this.response.data.length > 0) {
        this.showTable = true;
      }
      this.ngxService.stop();

    }, error => {
      this.ngxService.stop();
    });
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
