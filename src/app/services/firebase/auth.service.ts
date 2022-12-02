import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { collection, collectionData, doc } from "@angular/fire/firestore";
import { CollectionReference, Firestore } from "firebase/firestore";
import { User } from "src/app/Models/firebase/user.model";
import { UserService } from "../user.service";
import { FireStoreService } from "./firestore.service";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  static isLoggedIn = false;
  public user?: firebase.default.User; // Save logged in user data
  constructor(
    public fireStore: FireStoreService,
    private auth: AngularFireAuth
  ) {}

  async SignIn(email: string, password: string) {
    try {
      const rs = await this.auth.signInWithEmailAndPassword(email, password);
      console.log(rs);
      const user = rs.user as firebase.default.User;
      this.user = user;
      this.fireStore.getUser(user.uid);
      if (this.fireStore.isAdmin) {
        localStorage.setItem(
          "user",
          JSON.stringify(this.fireStore.isAdmin ? user : null)
        );
      }
      AuthService.isLoggedIn = this.fireStore.isAdmin ? true : false;
      localStorage.setItem(
        "isAdmin",
        JSON.stringify(this.fireStore.isAdmin ? true : false)
      );
      return this.fireStore.isAdmin;
    } catch (error) {
      localStorage.setItem("user", JSON.stringify(null));
      return false;
    }
  }

  get isLoggedIn(): boolean {
    const user: firebase.default.User = JSON.parse(
      localStorage.getItem("user")!
    );
    this.user = user;
    AuthService.isLoggedIn = user ? true : false;

    return user !== null ? true : false;
  }
  // Sign in with Google

  // Auth logic to run auth providers

  SignOut() {
    this.auth.signOut();
    // localStorage.getItem("user");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
  }
}
