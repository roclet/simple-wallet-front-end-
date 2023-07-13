import { Component, OnInit, inject } from '@angular/core';
import { TransactionHistory } from 'src/app/domain/transaction-history/transaction-history-repository.model';
import { TransactionHistoryService } from '../../service/transaction-history.service';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private readonly facade = inject(TransactionHistoryService);
  displayHeader: string[] = ['Transaction ID','Account Number','Transaction Type','Amount','User','Date'];

  tableRows: [] = [];
  itemValues!: TransactionHistory[];

  constructor() { }

  ngOnInit(): void {
    const token: any = jwt_decode(localStorage.getItem(this.authLocalStorageToken)!);
    this.facade.getEntity(token.sub)
    .subscribe({
      next: (result:any) => {
        console.log("## result ##", result);
        if(result.length !== 0) {
          this.itemValues = result;
          console.log("** this.itemValues **", this.itemValues);
        }
      }
    });
  }

  itemValue(itemValue: TransactionHistory): TransactionHistory {
    return {
      transactionId: itemValue.transactionId,
      userId: itemValue.userId,
      accountNumber: itemValue.accountNumber,
      transactionAmount: itemValue.transactionAmount,
      transactionDateTime: itemValue.transactionDateTime,
    }
  }

}
