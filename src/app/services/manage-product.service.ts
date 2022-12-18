import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "../Models/firebase/product.model";
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
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class ManageProductService {
  public products: PeriodicElement[] = [];

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
      .collection<Product>("Users", (ref) =>
        ref.where("roles", "array-contains-any", ["tourist", "admin"])
      )
      .valueChanges()
      .subscribe((product) => {
        const temp = this.getPeriodicElements(product, ignoreUid);
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
  private getPeriodicElements(products: Product[], ignoreUid?: string) {
    this.products = [] as PeriodicElement[];

    let i = 0;
    this.firestore.totalProducts = 0;
    // public name: string,
    // public description: string,
    // public image: string,
    // public price: string,
    products.forEach((product, idx) => {
      if (product.id != ignoreUid) {
        i++;
        this.products.push({
          id: product.id,
          description: product.description,
          image: product.image,
          is_allowed: product.is_allowed,
          price: product.price,
          title: product.title,
          publish_at: product.publish_at,
          seller: product.seller,
          menu: "",
          position: idx + 1,
        });
      }
    });
    // console.log(this.products);

    return this.products;
  }
}

