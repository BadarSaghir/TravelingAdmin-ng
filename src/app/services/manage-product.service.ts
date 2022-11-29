import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Item } from "../Models/firebase/product.model";
import { FireStoreService } from "./firebase/firestore.service";
import { PeriodicElement } from "../Nav-Modules/manage-product/view-product/view-product.component";
import {
  Firestore,
  collectionGroup,
  collection,
  collectionData,
  DocumentData,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ManageProductService {
  public products: PeriodicElement[] = [];

  // registerUser(user: any) {
  //   return this.http.post<any>(this._registerUrl, user);
  // }
  constructor(private firestore: FireStoreService) {}

  public setDataInTable(
    fn?: (tmp: PeriodicElement[]) => void,
    ignoreUid?: string
  ) {
    this.firestore.getCollectionGroup((AngularStore, fireStore) => {
      const ref = collectionData(
        collectionGroup(fireStore, "items")
      ) as Observable<Item[]>;
      ref.subscribe((items) => {
        const temp = this.getPeriodicElements(items, ignoreUid);
        if (fn) {
          fn(temp);
        }
      });
    });
  }
  private getPeriodicElements(items: Item[], ignoreUid?: string) {
    this.products = [] as PeriodicElement[];

    let i = 0;
    this.firestore.totalProducts = 0;
    // public name: string,
    // public description: string,
    // public image: string,
    // public price: string,
    items.forEach((item, idx) => {
      if (item.id != ignoreUid) {
        i++;
        this.products.push({
          menu: "",
          position: idx + 1,
          item: item,
        });
      }
    });
    // console.log(this.products);

    return this.products;
  }
}

