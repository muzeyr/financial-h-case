import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TransactionReportComponent } from './components/transaction/transaction-report/transaction-report.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionQueryComponent } from './components/transaction/transaction-query/transaction-query.component';
import { LogutComponent } from './components/logut/logut.component';
import { TransactionComponent } from './components/transaction/transaction/transaction.component';
import { AuthGuard } from './moduls/helps/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' , pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogutComponent},
  { path: 'transaction-query', component: TransactionQueryComponent, canActivate: [AuthGuard] },
  { path: 'transaction-report', component: TransactionReportComponent, canActivate: [AuthGuard] },
  { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
