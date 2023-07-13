import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DebitAccountRequest } from 'src/app/domain/account/debit-account-request';
import { DebitAccountFacadeService } from '../../facades/debit-account-facade.service';
import { DebitAccountService } from '../../service/debit-account.service';
import { environment } from 'src/environments/environment';
import { CreateAccountService } from '../../service/create-account.service';
import jwt_decode from 'jwt-decode';
import { CreateAccountRequest } from 'src/app/domain/account/create-account-request';
type Entry = DebitAccountRequest;

@Component({
  selector: 'app-debit-account',
  templateUrl: './debit-account.component.html',
  styleUrls: ['./debit-account.component.css']
})
export class DebitAccountComponent implements OnInit {

  createAccountForm!: FormGroup;
  private readonly valueFacade = inject(DebitAccountFacadeService);
  private readonly service = inject(DebitAccountService);
  private readonly facade = inject(CreateAccountService);

  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
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
