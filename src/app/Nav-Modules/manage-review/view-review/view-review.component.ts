import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import { FireStoreService } from "src/app/services/firebase/firestore.service";
import { ReviewService } from "src/app/services/review.service";
import { CollectionsTypes } from "src/app/shared/types/collection.type";

export interface PeriodicElement {
  id?: string;
  title: string;
  position: number;
  userid: number;
  rating: string;
  menu: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, title: "Ali", rating: "stars", userid: 1, menu: "" },
  { position: 2, title: "rizwan", rating: "stars", userid: 2, menu: "" },
  { position: 3, title: "usman", rating: "stars", userid: 3, menu: "" },
  { position: 4, title: "owais", rating: "stars", userid: 4, menu: "" },
  { position: 5, title: "aliza", rating: "stars", userid: 5, menu: "" },
  { position: 6, title: "saira", rating: "stars", userid: 6, menu: "" },
  { position: 7, title: "akbar", rating: "stars", userid: 7, menu: "" },
  { position: 8, title: "raza", rating: "stars", userid: 8, menu: "" },
  { position: 9, title: "wajid", rating: "stars", userid: 9, menu: "" },
  { position: 10, title: "sumera", rating: "stars", userid: 10, menu: "" },
];

@Component({
  selector: "app-view-review",
  templateUrl: "./view-review.component.html",
  styleUrls: ["./view-review.component.css"],
})
export class ViewReviewComponent implements OnInit {
  ngOnInit(): void {
    this.reviewService.setDataInTable((tmp) => {
      this.dataSource.setData(tmp);
    });
  }
  constructor(
    private firestore: FireStoreService,
    public reviewService: ReviewService // private store: Firestore
  ) {}

  deleteLocation(id: string) {
    this.firestore.deleteDocument("Reviews" as CollectionsTypes, { uid: id });
    console.log("id", id);

    // deleteDoc(doc(collection(this.store, "products", id, "items"), pid));
  }
  displayedColumns: string[] = [
    "position",
    "title",
    "rating",
    "userid",
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
