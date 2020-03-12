import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TransactionReportComponent } from './components/transaction/transaction-report/transaction-report.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionQueryComponent } from './components/transaction/transaction-query/transaction-query.component';
import { LogutComponent } from './components/logut/logut.component';
import { AuthGuard } from './moduls/helps/auth.guard';
import { TransactionFindComponent } from './components/transaction/transaction-find/transaction-find.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' , pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'log-out', component: LogutComponent},
  { path: 'transaction-query', component: TransactionQueryComponent, canActivate: [AuthGuard] },
  { path: 'transaction-report', component: TransactionReportComponent, canActivate: [AuthGuard] },
  { path: 'transaction/:id', component: TransactionFindComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
