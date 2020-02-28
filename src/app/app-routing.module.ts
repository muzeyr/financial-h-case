import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TransactionReportComponent } from './components/transaction/transaction-report/transaction-report.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionQueryComponent } from './components/transaction/transaction-query/transaction-query.component';
import { LogutComponent } from './components/logut/logut.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' , pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogutComponent},
  { path: 'transaction-query', component: TransactionQueryComponent},
  { path: 'transaction-report', component: TransactionReportComponent},
  {path: '', component: LoginComponent, children: [{
                                          path: 'pages',
                                          loadChildren: './pages/pages.module#PagesModule'
                                        }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
