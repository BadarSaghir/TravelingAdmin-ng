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
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { User } from "src/app/Models/firebase/user.model";
import { CollectionsTypes } from "src/app/shared/types/collection.type";

@Injectable({
  providedIn: "root",
})
export class FireStoreService {
  public totalPlaces = 0;
  public totalUsers = 0;
  public totalApproveSellers = 0;
  public totalUnApproveSellers = 0;

  public constructor(private store: Firestore) {}
  getCollectionData<T>(collectionName: CollectionsTypes): Observable<T[]> {
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

  async addDocInCollection<T extends { id?: string; uid?: string }>(
    user: T,
    id: "id" | "uid",
    collectionName: CollectionsTypes
  ) {
    if (id == "id") user.id = doc(collection(this.store, id)).id;
    if (id == "uid") user.uid = doc(collection(this.store, id)).id;

    return await addDoc<T>(
      collection(this.store, collectionName) as CollectionReference<T>,
      user
    );
  }

  deleteDocument<T extends { uid: string }>(
    collectionName: CollectionsTypes,
    user: T
  ) {
    const ref = doc(collection(this.store, `${collectionName}`), `${user.uid}`);
    return deleteDoc(ref);
  }
  async updateDoc<T extends { uid: string }>(
    oldUser: T,
    newUser: T,
    collectionName: CollectionsTypes
  ): Promise<boolean> {
    const ref = doc(
      this.store,
      `${collectionName}/${oldUser.uid}`
    ) as DocumentReference<User>;
    try {
      await updateDoc<User>(ref, newUser);
      return true;
    } catch (error) {
      return false;
    }
  }
  // Save logged in user data
}
