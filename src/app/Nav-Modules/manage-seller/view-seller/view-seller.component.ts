import { Component, OnInit } from '@angular/core';

import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import { PeriodicElement } from "../../manage-user/view-user/view-user.component";
import { ManageSellerService } from "src/app/services/manage-seller.service";
import { FireStoreService } from "src/app/services/firebase/firestore.service";
import { Seller } from "src/app/Models/firebase/user.model";

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: "app-view-seller",
  templateUrl: "./view-seller.component.html",
  styleUrls: ["./view-seller.component.css"],
})
export class ViewSellerComponent implements OnInit {
  constructor(
    private sellerService: ManageSellerService,
    public fireStoreService: FireStoreService
  ) {}
  ngOnInit(): void {
    this.sellerService.setDataInTable((tmp) => {
      this.dataSource.setData(tmp);
    });
  }

  updateApproval(element: PeriodicElement) {
    this.fireStoreService.updateDoc<Seller>(
      {
        email: element.email,
        firstName: element.firstName,
        isApprove: element.isApprove as boolean,
        secondName: element.secondName,
        uid: element.uid,
      },
      {
        email: element.email,
        firstName: element.firstName,
        isApprove: !element.isApprove as boolean,
        secondName: element.secondName,
        uid: element.uid,
      },
      "Seller"
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
