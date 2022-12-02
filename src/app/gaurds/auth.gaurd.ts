import {
  AngularFireAuthGuard,
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from "@angular/fire/compat/auth-guard";

export const adminOnlyPipe = () =>
  localStorage.getItem("isAdmin")
    ? redirectLoggedInTo(["/"])
    : redirectUnauthorizedTo(["/auth/login"]);

import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/firebase/auth.service";
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    console.log("logged", this.auth.isLogIn);
    if (!this.auth.isLogIn) {
      this.router.navigate(["/auth/login"]);
      return false;
    }
    return true;
  }
}
