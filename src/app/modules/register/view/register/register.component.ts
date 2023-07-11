import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterFacadeService } from '../../facades/register-facade.service';
import { RegsiterService } from '../../service/regsiter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private readonly valueFacade = inject(RegisterFacadeService);
  private readonly registerService = inject(RegsiterService);
  returnURL: any;
  constructor(private formBuilder: FormBuilder,private router:Router) {}

  ngOnInit(): void {
    this.returnURL = '/login';
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onRegister() {
    const model = this.getItemValue();
    this.valueFacade
      .createEntity(model)
      .subscribe({
        next: (result:any) => {
            if (result.isSuccess) {
              this.router.navigate([this.returnURL]);
            }
            
        }, error: (err:any) => console.log(err)
      });
  }

  getItemValue(): any {
    return {
      email: this.registerForm.value.email,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      password: this.registerForm.value.password
    }
  }
}
