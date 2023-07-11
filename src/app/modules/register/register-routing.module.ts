import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './view/register/register.component';
import { LoginLandingComponent } from '../login/login-landing.component';

const routes: Routes = [
  {
    path: '',
    component: LoginLandingComponent,
    children: [
      {path: '', component: RegisterComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
