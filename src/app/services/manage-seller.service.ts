import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seller } from "../Models/firebase/user.model";
import { PeriodicElement } from "../Nav-Modules/manage-user/view-user/view-user.component";
import { FireStoreService } from "./firebase/firestore.service";

@Injectable({
  providedIn: "root",
})
export class ManageSellerService {
  public sellers: PeriodicElement[] = [];

  // registerUser(user: any) {
  //   return this.http.post<any>(this._registerUrl, user);
  // }
  constructor(private firestore: FireStoreService) {}

  public setDataInTable(
    fn?: (tmp: PeriodicElement[]) => void,
    ignoreUid?: string
  ) {
    this.firestore.getCollectionData<Seller>("seller").subscribe((seller) => {
      if (fn) {
        const temp = this.getPeriodicElements(seller, ignoreUid);
        fn(temp);
      } else {
        this.getPeriodicElements(seller, ignoreUid);
      }
    });
  }
  private getPeriodicElements(
    sellers: Seller[] | PeriodicElement[],
    ignoreUid?: string
  ) {
    this.sellers = [] as PeriodicElement[];

    let i = 0;
    this.firestore.totalApproveSellers = 0;
    this.firestore.totalApproveSellers = 0;

    sellers.forEach((seller, idx) => {
      if (seller.uid != ignoreUid) {
        i++;
        if (seller.isApprove == true) this.firestore.totalApproveSellers++;
        else this.firestore.totalUnApproveSellers++;
        this.sellers.push({
          email: seller.email,
          firstName: seller.firstName,
          position: idx + 1,
          menu: "",
          secondName: seller.secondName,
          uid: seller.uid,
        });
      }
    });
    return this.sellers;
  }
}
