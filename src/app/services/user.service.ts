import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../Models/firebase/user.model";
import { FireStoreService } from "./firebase/firestore.service";
import { PeriodicElement } from "../Nav-Modules/manage-user/view-user/view-user.component";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    public firestore: FireStoreService,
    private angularFireStore: AngularFirestore
  ) {}
  public users: PeriodicElement[] = [];

  // registerUser(user: any) {
  //   return this.http.post<any>(this._registerUrl, user);
  // }

  public setDataInTable(
    fn?: (tmp: PeriodicElement[]) => void,
    ignoreUid?: string
  ) {
    this.angularFireStore
      .collection<User>("Users", (ref) =>
        ref.where("roles", "array-contains", "tourist")
      )
      .valueChanges()
      .subscribe((seller) => {
        const temp = this.getPeriodicElements(seller, ignoreUid);
        if (fn) {
          fn(temp);
        }
      });
    // this.firestore.getCollectionData<User>("users").subscribe((user) => {
    //   if (fn) {
    //     const temp = this.getPeriodicElements(user, ignoreUid);
    //     fn(temp);
    //   } else {
    //     this.getPeriodicElements(user, ignoreUid);
    //   }
    // });
  }
  private getPeriodicElements(user: User[], ignoreUid?: string) {
    this.users = [] as PeriodicElement[];
    let i = 0;
    this.firestore.totalUsers = 0;

    user.forEach((user, idx) => {
      if (user.id != ignoreUid) {
        this.firestore.totalUsers++;
        i++;
        this.users.push({
          email_address: user.email_address,
          id: user.id,
          image_url: user.email_address,
          name: user.name,
          position: idx + 1,
          menu: "",
          roles: user.roles,
          is_allowed: user.is_allowed,
          joined_at: user.joined_at,
          location: user.location,
          image: user.image_url,
          isApprove: user.is_allowed,
        });
      }
    });
    return this.users;
  }
}
