// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Seller, User } from "src/app/Models/firebase/user.model";
// import { FireStoreService } from "src/app/services/firebase/firestore.service";
// import { emailValidator } from "../../../email-validator.directive";
// import { ManageUser } from "../../../Models/manage-user";
// import { UserService } from "../../../services/user.service";

// interface IUser extends User {
//   password: string;
//   showPassword: boolean;
// }

// @Component({
//   selector: "app-add-user",
//   templateUrl: "./add-user.component.html",
//   styleUrls: ["./add-user.component.css"],
// })
// export class AddUserComponent implements OnInit {
//   reactiveForm!: FormGroup;
//   user: IUser;

//   constructor(
//     private _auth: UserService,
//     private _fireStore: FireStoreService
//   ) {
//     this.user = {} as IUser;
//   }
//   manageUser = new ManageUser("", "", "", "", "", "");

//   ngOnInit(): void {
//     this.reactiveForm = new FormGroup({
//       firstName: new FormControl(this.user.name, [
//         Validators.required,
//         Validators.minLength(1),
//         Validators.maxLength(250),
//       ]),

//       email: new FormControl(this.user.email_address, [
//         Validators.required,
//         Validators.minLength(1),
//         Validators.maxLength(250),
//         emailValidator(),
//       ]),
//       role: new FormControl(this.user.roles[0], [
//         Validators.required,
//         Validators.minLength(1),
//         Validators.maxLength(10),
//       ]),
//       password: new FormControl(this.user.password, [
//         Validators.required,
//         Validators.minLength(3),
//       ]),
//     });
//   }

//   get firstName() {
//     return this.reactiveForm.get("firstName")!;
//   }

//   get secondName() {
//     return this.reactiveForm.get("secondName")!;
//   }

//   get email() {
//     return this.reactiveForm.get("email")!;
//   }

//   get password() {
//     return this.reactiveForm.get("password")!;
//   }
//   get role() {
//     return this.reactiveForm.get("role")!;
//   }

//   public validate(): void {
//     if (this.reactiveForm.invalid) {
//       for (const control of Object.keys(this.reactiveForm.controls)) {
//         this.reactiveForm.controls[control].markAsTouched();
//       }

//       return;
//     }

//     this.user = this.reactiveForm.value;
//     // console.info(this.ManageUser);
//     console.info("Name:", this.user.firstName);
//     console.info("Nickname:", this.user.secondName);
//     console.info("Nickname:", this.user.role);

//     console.info("Email:", this.user.email);
//     console.info("Password:", this.user.password);
//     this._fireStore.addDocInCollection<User>(
//       {
//         email: this.user.email,
//         firstName: this.user.firstName,
//         role: this.user.role,
//         secondName: this.user.secondName,
//         uid: "",
//       },
//       "uid",
//       "users"
//     );
//   }
// }
