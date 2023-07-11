import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { CreateAccountComponent } from './view/create-account/create-account.component';
import { AcoountBalanceComponent } from './view/acoount-balance/acoount-balance.component';
import { CreditAccountComponent } from './view/credit-account/credit-account.component';
import { DebitAccountComponent } from './view/debit-account/debit-account.component';
import { TransactionHistoryComponent } from './view/transaction-history/transaction-history.component';
import { LandingComponent } from './view/landing/landing.component';
import { DataTableComponent } from './view/data-table/data-table.component';
import { HeaderComponent } from './view/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CreateAccountComponent,
    AcoountBalanceComponent,
    CreditAccountComponent,
    DebitAccountComponent,
    TransactionHistoryComponent,
    LandingComponent,
    DataTableComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WalletRoutingModule,
  ]
})
export class WalletModule { }
