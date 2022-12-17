import { Injectable } from "@angular/core";

import {
  Firestore,
  collection,
  doc,
  collectionData,
  addDoc,
  deleteDoc,
  updateDoc,
  DocumentReference,
  CollectionReference,
  collectionGroup,
  DocumentSnapshot,
} from "@angular/fire/firestore";
import { Action, AngularFirestore } from "@angular/fire/compat/firestore";
import { firstValueFrom, Observable } from "rxjs";
import { Item } from "src/app/Models/firebase/product.model";
import { User } from "src/app/Models/firebase/user.model";
import { CollectionsTypes } from "src/app/shared/types/collection.type";

@Injectable({
  providedIn: "root",
})
export class FireStoreService {
  public totalPlaces = 0;
  public totalUsers = 0;
  public totalProducts = 0;
  public totalApproveSellers = 0;
  public totalUnApproveSellers = 0;
  public isAdmin = false;

  public constructor(
    private store: Firestore,
    private angularFireStore: AngularFirestore
  ) {}
  getCollectionData<T>(
    collectionName: CollectionsTypes | string
  ): Observable<T[]> {
    let userCollection = collection(this.store, collectionName);
    return collectionData(userCollection, {
      idField: "uid",
    }) as Observable<T[]>;
  }
  get getTotalPalce() {
    return this.totalPlaces;
  }
  get getTotalUsers() {
    return this.totalUsers;
  }
  get getTotalApproveSeller() {
    return this.totalApproveSellers;
  }
  get getTotalUnApproveSeller() {
    return this.totalUnApproveSellers;
  }
  set setTotalPalce(value: number) {
    this.totalPlaces = value;
  }
  set setTotalUsers(value: number) {
    this.totalUsers = value;
  }
  set setTotalApproveSeller(value: number) {
    this.totalApproveSellers = value;
  }
  set setTotalUnApproveSeller(value: number) {
    this.totalUnApproveSellers = value;
  }

  async addDocInCollection<
    T extends { id?: string; uid?: string; item?: Item }
  >(user: T, id: "id" | "uid", collectionName: CollectionsTypes | string) {
    if (id == "id") user.id = doc(collection(this.store, id)).id;
    if (id == "uid") user.uid = doc(collection(this.store, id)).id;
    return await addDoc<T>(
      collection(this.store, collectionName) as CollectionReference<T>,
      user
    );
  }

  deleteDocument<T extends { uid: string }>(
    collectionName: CollectionsTypes | string,
    user: T
  ) {
    const ref = doc(collection(this.store, `${collectionName}`), `${user.uid}`);
    return deleteDoc(ref);
  }

  deleteCollectionGroupDocument<T extends { uid: string }>(
    collectionName: CollectionsTypes | string,
    user: T
  ) {
    const ref = collectionGroup(this.store, "items");

    // return deleteDoc();
  }

  async updateDoc<T extends { id: string }>(
    oldUser: T,
    newUser: T,
    collectionName: CollectionsTypes | string
  ): Promise<boolean> {
    const ref = (await doc(
      this.store,
      `${collectionName}/${oldUser.id}`
    )) as DocumentReference<T>;
    try {
      this.angularFireStore
        .doc(`${collectionName}/${oldUser.id}`)
        .update(newUser);
      return true;
    } catch (error) {
      return false;
    }
  }
  async getCollectionGroup(
    fn: (store: AngularFirestore, firestore: Firestore) => void
  ) {
    fn(this.angularFireStore, this.store);
  }

  async getUser(uid: string, fn?: (a: any) => void) {
    const ref = await firstValueFrom(
      this.angularFireStore.collection<User>("Users").doc(uid).get()
    );
    // console.log("login",  == "admin");
    const user = ref.data();
    if (user) {
      if (user.image_url.length > 0)
        localStorage.setItem("img", user.image_url);
      for (let index = 0; index < user.roles.length; index++) {
        if (user.roles[index]) {
          this.isAdmin = true;
          break;
        } else {
          this.isAdmin = false;
          //     if (fn) fn(u);
          //     ref.unsubscribe();
        }
      }
    } else {
      this.isAdmin = false;
    }

    return this.isAdmin;

    // .subscribe((u) => {
    //   console.log("login", u.data()?.role == "admin");
    //   if (u.data()?.role == "admin") {
    //     this.isAdmin = true;
    //     if (fn) fn(u);
    //     ref.unsubscribe();
    //   } else {
    //     this.isAdmin = false;
    //     if (fn) fn(u);
    //     ref.unsubscribe();
    //   }
    //   //
    // });

    // ref.unsubscribe();
  }
  // Save logged in user data
}
