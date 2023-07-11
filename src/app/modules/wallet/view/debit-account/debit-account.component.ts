import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DebitAccountRequest } from 'src/app/domain/account/debit-account-request';
import { DebitAccountFacadeService } from '../../facades/debit-account-facade.service';
import { DebitAccountService } from '../../service/debit-account.service';
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
