import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditAccountFacadeService } from '../../facades/credit-account-facade.service';
import { CreditAccountService } from '../../service/credit-account.service';
import { CreditAccountRequest } from 'src/app/domain/account/credit-account-request';
type Entry = CreditAccountRequest;

@Component({
  selector: 'app-credit-account',
  templateUrl: './credit-account.component.html',
  styleUrls: ['./credit-account.component.css'],
})
export class CreditAccountComponent implements OnInit {
  createAccountForm!: FormGroup;
  private readonly valueFacade = inject(CreditAccountFacadeService);
  private readonly service = inject(CreditAccountService);
  returnURL: any;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.createAccountForm = this.formBuilder.group({
      accountNumber: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  onCreateAccount() {
    const model = this.getItemValue();
    this.valueFacade.createEntity(model).subscribe({
      next: (result: any) => {
        if (result) {
          console.log('onCreateAccount', result);
        }
      },
      error: (err: any) => console.log(err),
    });
  }

  getItemValue(): any {
    const data: Entry = {
      accountNumber: this.randomString(10),
      userId: 'roclet@gamil.com',
      amount: this.createAccountForm.value.currentBalance,
      transactionDateTime: '2021-20-12',
    };
    return data;
  }

  randomString(length: number) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }
}
