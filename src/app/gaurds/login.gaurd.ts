import {
  AngularFireAuthGuard,
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from "@angular/fire/compat/auth-guard";



import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/firebase/auth.service";
@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    console.log("logged", this.auth.isLoggedIn);
    if (this.auth.isLoggedIn) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
