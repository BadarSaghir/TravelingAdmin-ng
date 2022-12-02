import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from "src/app/Models/firebase/user.model";
import { AuthService } from "src/app/services/firebase/auth.service";
import { FireStoreService } from "src/app/services/firebase/firestore.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import { AngularFirestore } from "@angular/fire/compat/firestore";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private firestore: FireStoreService,
    private auth: AuthService // private user: UserService // public authService: AuthService,
  ) {}

  ngOnInit(): void {}
  err = false;
  proceedlogin(name: string, pass: string) {
    console.log("button press", name, pass);
    this.auth.SignIn(name, pass, (chk) => {
      if (chk) {
        this.router.navigate(["/"]);
        this.err = false;
      } else {
        this.err = true;
      }
    });
  }
}

