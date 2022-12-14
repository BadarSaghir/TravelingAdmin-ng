import { Component, OnInit } from '@angular/core';

import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import { PeriodicElement } from "../../manage-user/view-user/view-user.component";
import { ManageSellerService } from "src/app/services/manage-seller.service";
import { FireStoreService } from "src/app/services/firebase/firestore.service";
import { Seller, User } from "src/app/Models/firebase/user.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
// import * as firebase from "firebase/app";

import { environment } from "src/environments/environment";

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: "app-view-seller",
  templateUrl: "./view-seller.component.html",
  styleUrls: ["./view-seller.component.css"],
})
export class ViewSellerComponent implements OnInit {
  constructor(
    private sellerService: ManageSellerService,
    public auth: AngularFireAuth,
    public fireStoreService: FireStoreService
  ) {}
  ngOnInit(): void {
    // firebase

    // fireAdmin.auth(getApp());

    this.sellerService.setDataInTable((tmp) => {
      this.dataSource.setData(tmp);
    });
  }

  updateApproval(element: PeriodicElement) {
    this.fireStoreService.updateDoc<User>(
      {
        is_deleted: false,
        email_address: element.email_address,
        name: element.name,
        roles: element.roles,
        id: element.id,
        image_url: element.image_url,
        joined_at: element.joined_at,
        is_allowed: element.is_allowed,
        location: element.location,
      },
      {
        is_deleted: false,
        email_address: element.email_address,
        name: element.name,
        roles: element.roles,
        id: element.id,
        image_url: element.image_url,
        joined_at: element.joined_at,
        is_allowed: !element.is_allowed,
        location: element.location,
      },
      "Users"
    );
  }

  displayedColumns: string[] = [
    "position",
    "name",
    "email",
    "Approve",
    "changeApprove",
    "menu",
  ];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataToDisplay = [
      ...this.dataToDisplay,
      ELEMENT_DATA[randomElementIndex],
    ];
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }
  async deleteUser(element: any) {
    // console.log("uid", uid);
    // this.fireStoreService.deleteDocument("Users", { uid: uid });
    this.fireStoreService.updateDoc<User>(
      {
        is_deleted: false,
        email_address: element.email_address,
        name: element.name,
        roles: element.roles,
        id: element.id,
        image_url: element.image_url,
        joined_at: element.joined_at,
        is_allowed: element.is_allowed,
        location: element.location,
      },
      {
        is_deleted: true,
        email_address: element.email_address,
        name: element.name,
        roles: element.roles,
        id: element.id,
        image_url: element.image_url,
        joined_at: element.joined_at,
        is_allowed: false,
        location: element.location,
      },
      "Users"
    );

    // this.auth.
    // this..deleteUser(userId)

    // const tmp = this.getPeriodicElements(ELEMENT_DATA, uid);
    // this.dataSource.setData(tmp);
  }
}

class ExampleDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new ReplaySubject<PeriodicElement[]>();
  dialog: any;

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }


}
