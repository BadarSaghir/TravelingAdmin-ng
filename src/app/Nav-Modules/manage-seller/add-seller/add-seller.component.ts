import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Seller } from "src/app/Models/firebase/user.model";
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
}

@Component({
  selector: "app-add-seller",
  templateUrl: "./add-seller.component.html",
  styleUrls: ["./add-seller.component.css"],
})
export class AddSellerComponent implements OnInit {
  reactiveForm!: FormGroup;
  user: IUser;

  constructor(
    private _auth: ManageSellerService,
    private _fireStore: FireStoreService
  ) {
    this.user = {} as IUser;
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
    this._fireStore.addDocInCollection<Seller>(
      {
        email: this.user.email,
        firstName: this.user.firstName,
        isApprove: this.user.role,
        secondName: this.user.secondName,
        uid: "",
      },
      "id",
      "Seller"
    );
  }
}


