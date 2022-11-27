import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from "src/app/Models/firebase/user.model";
import { AuthService } from "src/app/services/firebase/auth.service";
import { FireStoreService } from "src/app/services/firebase/firestore.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private firestore: FireStoreService // private user: UserService // public authService: AuthService,
  ) {}

  ngOnInit(): void {}

  proceedlogin(name: string, pass: string) {
    // this.authService.SignIn(name, pass);
  }
}

