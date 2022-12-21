import { Component, OnInit } from '@angular/core';

import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import { FireStoreService } from "src/app/services/firebase/firestore.service";
import { User } from "src/app/Models/firebase/user.model";
import { UserService } from "src/app/services/user.service";

export interface PeriodicElement extends User {
  position: number;
  isApprove?: boolean;
  menu: string;
  description?: string;
  image?: string;
  price?: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: "app-view-user",
  templateUrl: "./view-user.component.html",
  styleUrls: ["./view-user.component.css"],
})
export class ViewUserComponent implements OnInit {
  constructor(
    private firestore: FireStoreService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.userService.setDataInTable((tmp) => {
      this.dataSource.setData(tmp);
    });
  }

  displayedColumns: string[] = ["position", "name", "role", "email", "menu"];
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
    this.firestore.updateDoc<User>(
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