import { Component, OnInit, inject } from '@angular/core';
import { CredentialModel } from 'src/app/domain/login/credential.model';
import { LoginFacadeService } from '../../facades/login-facade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { environment } from 'src/environments/environment';
import { AuthModel } from 'src/app/domain/login/auth.mode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  loginForm!: FormGroup;
  private readonly valueFacade = inject(LoginFacadeService);
  private readonly loginService = inject(LoginService);

  constructor(private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    const model = this.getItemValue();
    this.valueFacade
      .createEntity(model)
      .subscribe({
        next: (result:any) => {
            if (result.isSuccess) {
              const token: [] = result.data;
              if(this.setAuthFromLocalStorage(token)) this.router.navigate(['/wallet']);
              else this.router.navigate(['/login']);
            }
            
        }, error: (err:any) => console.log(err)
      });
  }

  getItemValue(): any {
    return {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel[]): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth[0].token) {
      localStorage.setItem(this.authLocalStorageToken, auth[0].token);
      return true;
    }
    return false;
  }

}
