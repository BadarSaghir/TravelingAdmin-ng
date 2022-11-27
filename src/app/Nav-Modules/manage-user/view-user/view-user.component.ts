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
  async deleteUser(uid: string) {
    console.log("uid", uid);
    await this.firestore.deleteDocument("users", { uid: uid });
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