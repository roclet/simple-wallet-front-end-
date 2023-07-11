import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAccountRequest } from 'src/app/domain/account/create-account-request';
import { CreateAccountService } from '../../service/create-account.service';
import { CreateAccountFacadeService } from '../../facades/create-account-facade.service';
type Entry = CreateAccountRequest;

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  createAccountForm!: FormGroup;
  private readonly valueFacade = inject(CreateAccountFacadeService);
  private readonly service = inject(CreateAccountService);
  returnURL: any;
  constructor(private formBuilder: FormBuilder,private router:Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.createAccountForm = this.formBuilder.group({
      accountTyper: ['', [Validators.required]],
      currentBalance: ['', [Validators.required]],
    });
  }

  onCreateAccount(){
    const model = this.getItemValue();
    this.valueFacade
      .createEntity(model)
      .subscribe({
        next: (result:any) => {
            if (result) {
              console.log("onCreateAccount", result);
            }
            
        }, error: (err:any) => console.log(err)
      });
  }

  getItemValue(): any {
    const data:Entry = {
      transactionId : this.randomString(10),
      accountNumber :this.randomString(10),
      userId : 'roclet@gamil.com',
      accountTyper: this.createAccountForm.value.accountTyper,
      currentBalance: this.createAccountForm.value.currentBalance,
      modifiedDateTime: '2021-20-12'
    };
    return data;
  }

  randomString(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
 }
}
