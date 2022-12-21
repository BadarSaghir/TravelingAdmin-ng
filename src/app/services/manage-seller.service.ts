import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seller, User } from "../Models/firebase/user.model";
import { PeriodicElement } from "../Nav-Modules/manage-user/view-user/view-user.component";
import { FireStoreService } from "./firebase/firestore.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class ManageSellerService {
  public sellers: PeriodicElement[] = [];

  // registerUser(user: any) {
  //   return this.http.post<any>(this._registerUrl, user);
  // }
  constructor(
    private firestore: FireStoreService,
    private angularFireStore: AngularFirestore
  ) {}

  public setDataInTable(
    fn?: (tmp: PeriodicElement[]) => void,
    ignoreUid?: string
  ) {
    this.angularFireStore
      .collection<User>("Users", (ref) =>
        ref.where("roles", "array-contains", "seller")
      )
      .valueChanges()
      .subscribe((seller) => {
        const temp = this.getPeriodicElements(seller, ignoreUid);
        if (fn) {
          fn(temp);
        }
      });
    // this.firestore.getCollectionData<User>("Users").subscribe((seller) => {

    // });
  }
  private getPeriodicElements(
    sellers: User[] | PeriodicElement[],
    ignoreUid?: string
  ) {
    this.sellers = [] as PeriodicElement[];

    let i = 0;
    this.firestore.totalApproveSellers = 0;
    this.firestore.totalUnApproveSellers = 0;

    sellers.forEach((seller, idx) => {
      if (seller.is_deleted == false) {
        i++;
        if (seller.is_allowed == true) this.firestore.totalApproveSellers++;
        else {
          this.firestore.totalUnApproveSellers++;
        }

        this.sellers.push({
          is_deleted: false,
          email_address: seller.email_address,
          name: seller.name,
          position: idx + 1,
          menu: "",
          isApprove: seller.is_allowed,
          roles: seller.roles,
          id: seller.id,
          image_url: seller.image_url,
          joined_at: seller.joined_at,
          is_allowed: seller.is_allowed,
          location: seller.location,
          image: seller.image_url,
        });
      }
    });
    return this.sellers;
  }
}
