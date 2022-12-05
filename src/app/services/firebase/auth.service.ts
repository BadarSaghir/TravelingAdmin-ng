import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { collection, collectionData, doc } from "@angular/fire/firestore";
import { Route, Router } from "@angular/router";
import { CollectionReference, Firestore } from "firebase/firestore";
import { User } from "src/app/Models/firebase/user.model";
import { UserService } from "../user.service";
import { FireStoreService } from "./firestore.service";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  public isLogIn: boolean | null = null;
  public user: firebase.default.User | null = null; // Save logged in user data
  constructor(
    public fireStore: FireStoreService,
    public router: Router,
    private auth: AngularFireAuth
  ) {}

  async SignIn(email: string, password: string, fn: (chk: boolean) => void) {
    try {
      const rs = await this.auth.signInWithEmailAndPassword(email, password);
      console.log(rs);
      const user = rs.user as firebase.default.User;
      this.user = user;
      const admin = await this.fireStore.getUser(user.uid);
      // this.fireStore.getUser(user.uid, () => {
      console.log("isAdmin", admin ? admin : null);
      if (admin) {
        localStorage.setItem(
          "user",
          JSON.stringify(this.fireStore.isAdmin ? user : null)
        );
        this.isLogIn = this.fireStore.isAdmin ? true : null;
        localStorage.setItem(
          "isAdmin",
          JSON.stringify(this.fireStore.isAdmin ? true : null)
        );
        fn(this.fireStore.isAdmin);
      }
      // });
    } catch (error) {
      localStorage.setItem("user", JSON.stringify(null));
      fn(false);
    }
  }

  get isLoggedIn(): boolean|null {
    const user: firebase.default.User | null =
      localStorage.getItem("user") != null
        ? JSON.parse(localStorage.getItem("user")!)
        : null;
    this.user = user;
    this.isLogIn = user ? true : null;

    return user !== null ? true : null;
  }
  // Sign in with Google

  // Auth logic to run auth providers

  async SignOut() {
    await this.auth.signOut();
    // localStorage.getItem("user");
    this.user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    this.isLogIn = false;
    this.fireStore.isAdmin = false;
    this.router.navigate(["/auth/login"]);
  }
}
