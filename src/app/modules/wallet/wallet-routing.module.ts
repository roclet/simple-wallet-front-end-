import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './view/landing/landing.component';
import { TransactionHistoryComponent } from './view/transaction-history/transaction-history.component';
import { CreateAccountComponent } from './view/create-account/create-account.component';
import { DebitAccountComponent } from './view/debit-account/debit-account.component';
import { CreditAccountComponent } from './view/credit-account/credit-account.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {path: '', component: CreateAccountComponent},
      {path: 'balance/account', component: CreateAccountComponent},
      {path: 'credit/account', component: CreditAccountComponent},
      {path: 'debit/account', component: DebitAccountComponent},
      {path: 'transaction/history', component: TransactionHistoryComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
