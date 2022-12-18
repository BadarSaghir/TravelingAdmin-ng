import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { serverTimestamp, Timestamp } from "@angular/fire/firestore";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Seller, User } from "src/app/Models/firebase/user.model";
import { ManageSeller } from "src/app/Models/manage-seller";
import { ManageUser } from "src/app/Models/manage-user";
import { FireStoreService } from "src/app/services/firebase/firestore.service";
import { ManageSellerService } from "src/app/services/manage-seller.service";
import { emailValidator } from "../../../email-validator.directive";

interface IUser {
  firstName: any;
  secondName: any;
  role: any;
  name: string;
  nickname: string;
  email: string;
  password: string;
  showPassword: boolean;
  lat?: string;
  log?: string;
}

@Component({
  selector: "app-add-seller",
  templateUrl: "./add-seller.component.html",
  styleUrls: ["./add-seller.component.css"],
})
export class AddSellerComponent implements OnInit {
  reactiveForm!: FormGroup;
  public user: IUser;

  constructor(
    private _auth: ManageSellerService,
    private _fireStore: FireStoreService,
    private router: Router,
    private _angularFire: AngularFirestore,
    private _angularAuth: AngularFireAuth
  ) {
    this.user = { lat: "0", log: "0" } as IUser;
  }
  manageUser = new ManageUser("", "", "", "", "", "");

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      secondName: new FormControl(this.user.secondName, [
        Validators.maxLength(10),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        emailValidator(),
      ]),
      role: new FormControl(this.user.role, []),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  get firstName() {
    return this.reactiveForm.get("firstName")!;
  }

  get secondName() {
    return this.reactiveForm.get("secondName")!;
  }

  get email() {
    return this.reactiveForm.get("email")!;
  }

  get password() {
    return this.reactiveForm.get("password")!;
  }
  get role() {
    return this.reactiveForm.get("role")!;
  }

  public validate(): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }

      return;
    }

    this.user = this.reactiveForm.value;
    // console.info(this.ManageUser);
    console.info("Name:", this.user.firstName);
    console.info("Nickname:", this.user.secondName);
    console.info("isApproval:", this.user.role);

    console.info("Email:", this.user.email);
    console.info("Password:", this.user.password);
    console.info("lat:", this.user.lat);
    console.info("log:", this.user.log);

    // this._angularAuth
    //   .createUserWithEmailAndPassword(this.user.email, this.user.password)
    //   .then(async (auth) => {
    //     await auth.user?.uid;
    //     this._angularFire
    //       .collection<User>("Users")
    //       .doc(auth.user?.uid)
    //       .set({
    //         email_address: this.user.email,
    //         name: this.user.firstName,
    //         is_allowed: this.user.role,
    //         id: auth.user?.uid || "",
    //         image_url: "",
    //         roles: ["seller"],
    //         joined_at: serverTimestamp() as Timestamp,
    //         location: null,
    //       });

    //     this, this.router.navigateByUrl("/manage-seller/seller^view");
    //   });
  }
}


