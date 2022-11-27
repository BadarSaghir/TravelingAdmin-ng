import { Injectable, NgZone } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor() {}

  SignIn(email: string, password: string) {}

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google

  // Auth logic to run auth providers

  SignOut() {}
}
