import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAccountRequest } from 'src/app/domain/account/create-account-request';
import { CreateAccountService } from '../../service/create-account.service';
import { CreateAccountFacadeService } from '../../facades/create-account-facade.service';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { HttpUtil } from 'src/app/shared/http-util';
type Entry = CreateAccountRequest;

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
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
              this.router.navigate(['/wallet/transaction/history']);
            }
            
        }, error: (err:any) => console.log(err)
      });
  }

  getItemValue(): any {
    const token: any = jwt_decode(localStorage.getItem(this.authLocalStorageToken)!);
    const atodayString : string = new Date().toDateString();
    const data:Entry = {
      transactionId : HttpUtil.randomString(4),
      accountNumber : HttpUtil.randomString(10),
      userId : token.sub,
      accountTyper: this.createAccountForm.value.accountTyper,
      currentBalance: this.createAccountForm.value.currentBalance,
      modifiedDateTime: atodayString
    };
    return data;
  }

}
