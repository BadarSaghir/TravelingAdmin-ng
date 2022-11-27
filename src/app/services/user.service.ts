import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../Models/firebase/user.model";
import { FireStoreService } from "./firebase/firestore.service";
import { PeriodicElement } from "../Nav-Modules/manage-user/view-user/view-user.component";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(public firestore: FireStoreService) {}
  public users: PeriodicElement[] = [];

  // registerUser(user: any) {
  //   return this.http.post<any>(this._registerUrl, user);
  // }

  public setDataInTable(
    fn?: (tmp: PeriodicElement[]) => void,
    ignoreUid?: string
  ) {
    this.firestore.getCollectionData<User>("users").subscribe((user) => {
      if (fn) {
        const temp = this.getPeriodicElements(user, ignoreUid);
        fn(temp);
      } else {
        this.getPeriodicElements(user, ignoreUid);
      }
    });
  }
  private getPeriodicElements(
    user: User[] | PeriodicElement[],
    ignoreUid?: string
  ) {
    this.users = [] as PeriodicElement[];
    let i = 0;
    this.firestore.totalUsers = 0;

    user.forEach((user, idx) => {
      if (user.uid != ignoreUid) {
        this.firestore.totalUsers++;
        i++;
        this.users.push({
          email: user.email,
          firstName: user.firstName,
          position: idx + 1,
          menu: "",
          secondName: user.secondName,
          role: user.role,
          uid: user.uid,
        });
      }
    });
    return this.users;
  }
}
