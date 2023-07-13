import { Component, OnInit, inject } from '@angular/core';
import { CreateAccountRequest } from 'src/app/domain/account/create-account-request';
import { environment } from 'src/environments/environment';
import { CreateAccountService } from '../../service/create-account.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-acoount-balance',
  templateUrl: './acoount-balance.component.html',
  styleUrls: ['./acoount-balance.component.css'],
})
export class AcoountBalanceComponent implements OnInit {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private readonly facade = inject(CreateAccountService);
  displayHeader: string[] = ['Account Number', 'Balance'];
  itemValues: CreateAccountRequest[] = [];
  constructor() {}

  ngOnInit(): void {
    const token: any = jwt_decode(
      localStorage.getItem(this.authLocalStorageToken)!
    );
    this.facade.getEntity(token.sub).subscribe({
      next: (result: any) => {
        if (result) {
          this.itemValues.push(result);
        }
      },
    });
  }
}
