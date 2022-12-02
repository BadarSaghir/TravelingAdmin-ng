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
  placeid: string;
  userid: string | number;
  rating: string;
  menu: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

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

  deleteReview(id: string) {
    this.firestore.deleteDocument("Reviews" as CollectionsTypes, { uid: id });
    console.log("id", id);

    // deleteDoc(doc(collection(this.store, "products", id, "items"), pid));
  }
  displayedColumns: string[] = [
    "position",
    "title",
    "userid",
    "place_id",
    "rating",
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
