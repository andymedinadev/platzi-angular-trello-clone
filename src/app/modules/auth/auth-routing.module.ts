import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { redirectGuard } from '@guards/redirect.guard';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [redirectGuard],
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'forgot-password',
    canActivate: [redirectGuard],
    component: ForgotPasswordComponent,
    title: 'Forgot Password',
  },
  {
    path: 'register',
    canActivate: [redirectGuard],
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'recovery',
    canActivate: [redirectGuard],
    component: RecoveryComponent,
    title: 'Recovery',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
