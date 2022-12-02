import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {
  AngularFireAuthGuard,
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from "@angular/fire/compat/auth-guard";
import { adminOnlyPipe, AuthGuardService } from "../gaurds/auth.gaurd";
// export const adminOnly = () => hasCustomClaim("admin");

const routes: Routes = [
  {
    path: "auth",
    // canActivate: [AuthGuardService],
    children: [
      {
        path: "login",
        component: LoginComponent,
        // canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
