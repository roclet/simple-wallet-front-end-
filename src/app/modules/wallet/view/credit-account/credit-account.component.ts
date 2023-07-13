import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditAccountFacadeService } from '../../facades/credit-account-facade.service';
import { CreditAccountService } from '../../service/credit-account.service';
import { CreditAccountRequest } from 'src/app/domain/account/credit-account-request';
import { environment } from 'src/environments/environment';
import { CreateAccountService } from '../../service/create-account.service';
import jwt_decode from 'jwt-decode';
import { CreateAccountRequest } from 'src/app/domain/account/create-account-request';
type Entry = CreditAccountRequest;

@Component({
  selector: 'app-credit-account',
  templateUrl: './credit-account.component.html',
  styleUrls: ['./credit-account.component.css'],
})
export class CreditAccountComponent implements OnInit {

  createAccountForm!: FormGroup;
  private readonly valueFacade = inject(CreditAccountFacadeService);
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private readonly facade = inject(CreateAccountService);
  private readonly service = inject(CreditAccountService);
  returnURL: any;
  accountNumber: string = '';
  itemValues!: CreateAccountRequest;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const token: any = jwt_decode(
      localStorage.getItem(this.authLocalStorageToken)!
    );
    this.facade.getEntity(token.sub).subscribe({
      next: (result: any) => {
        if (result) {
          this.itemValues = result;
        }
      },
    });
    this.createForm();
  }

  createForm() {
    this.createAccountForm = this.formBuilder.group({
      amount: ['', [Validators.required]],
    });
  }

  onCreateAccount() {
    const model = this.getItemValue();
    this.valueFacade.createEntity(model).subscribe({
      next: (result: any) => {
        if (result) {
          this.accountNumber = result.accountNumber;
          this.router.navigate(['/wallet/transaction/history']);
        }
      },
      error: (err: any) => console.log(err),
    });
  }

  getItemValue(): any {
    const atodayString : string = new Date().toDateString();
    const data: Entry = {
      accountNumber: this.itemValues.accountNumber,
      userId: this.itemValues.userId,
      amount: this.createAccountForm.value.amount,
      transactionDateTime: atodayString,
    };
    return data;
  }

}
