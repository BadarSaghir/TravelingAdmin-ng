import { Component, OnInit } from '@angular/core';

import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  img: string;
  email: string;
  menu: string;

}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, img: '../assets/images/admin.jpg', name: 'Ali', email: 'info@gmail.com', menu: ''},
  {position: 2, img: '../assets/images/admin.jpg', name: 'rizwan', email: 'info@gmail.com', menu: ''},
  {position: 3, img: '../assets/images/admin.jpg', name: 'usman', email:'info@gmail.com', menu: ''},
  {position: 4, img: '../assets/images/admin.jpg', name: 'owais', email: 'info@gmail.com', menu: ''},
  {position: 5, img: '../assets/images/admin.jpg', name: 'aliza', email: 'info@gmail.com', menu: ''},
  {position: 6, img: '../assets/images/admin.jpg', name: 'saira', email: 'info@gmail.com', menu: ''},
  {position: 7, img: '../assets/images/admin.jpg', name: 'akbar', email: 'info@gmail.com', menu: ''},
  {position: 8, img: '../assets/images/admin.jpg', name: 'raza', email: 'info@gmail.com', menu: ''},
  {position: 9, img: '../assets/images/admin.jpg', name: 'wajid', email: 'info@gmail.com', menu: ''},
  {position: 10, img: '../assets/images/admin.jpg', name: 'sumera', email: 'info@gmail.com', menu: ''},
];

@Component({
  selector: "app-view-seller",
  templateUrl: "./view-seller.component.html",
  styleUrls: ["./view-seller.component.css"],
})
export class ViewSellerComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  displayedColumns: string[] = ["position", "name", "Approve", "email", "menu"];
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
