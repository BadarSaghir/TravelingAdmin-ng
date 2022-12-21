import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import { FireStoreService } from "src/app/services/firebase/firestore.service";
import { LocationService } from "src/app/services/location.service";
import { collection, Firestore } from "@angular/fire/firestore";
import { CollectionsTypes } from "src/app/shared/types/collection.type";
import { doc } from "firebase/firestore";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Product } from "src/app/Models/firebase/product.model";
import { Router } from "@angular/router";

export interface PeriodicElement {
  id?: string;
  position: number;
  title: string;
  img: string;
  description: string;
  history: string;
  location: string;
  rating: string;
  menu: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  // {position: 1, img: '../assets/images/admin.jpg', title: 'any title',    description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  // {position: 2, img: '../assets/images/admin.jpg', title: 'any title', description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  // {position: 3, img: '../assets/images/admin.jpg', title: 'any title',  description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  // {position: 4, img: '../assets/images/admin.jpg', title: 'any title',  description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  // {position: 5, img: '../assets/images/admin.jpg', title: 'any title',  description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  // {position: 6, img: '../assets/images/admin.jpg', title: 'any title',  description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  // {position: 7, img: '../assets/images/admin.jpg', title: 'any title',  description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  // {position: 8, img: '../assets/images/admin.jpg', title: 'any title',   description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  // {position: 9, img: '../assets/images/admin.jpg', title: 'any title',  description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  // {position: 10, img: '../assets/images/admin.jpg',title: 'any title', description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
];

@Component({
  selector: "app-view-location",
  templateUrl: "./view-location.component.html",
  styleUrls: ["./view-location.component.css"],
})
export class ViewLocationComponent implements OnInit {
  ngOnInit(): void {
    // this.productService.setDataInTable((tmp) => {
    //   this.dataSource.setData(tmp);
    // });
    this.productService.setDataInTable((tmp) => {
      this.dataSource.setData(tmp);
    });
    // const _ref = this.ngstore.collection("products").snapshotChanges();
    // console.log("checking doc id ", _ref);

    // const selected: CollectionsTypes = "";
    // this.firestore.getCollectionGroup((AngularStore, fireStore) => {
    // const ref = collectionData(collectionGroup(fireStore, "items"));
    // console.log(t
    //   ref.forEach((docs) => {
    //     console.log(docs);
    //   })
    // );
    // });
  }
  editLocation(id: string) {
    this.router.navigateByUrl("/manage-location/Edit^location/" + id);
  }

  constructor(
    private firestore: FireStoreService,
    public productService: LocationService,
    private store: Firestore,
    private router: Router,
    private ngstore: AngularFirestore
  ) {}

  deleteLocation(id: string) {
    this.firestore.deleteDocument("Places" as CollectionsTypes, { uid: id });
    console.log("id", id);

    // deleteDoc(doc(collection(this.store, "products", id, "items"), pid));
  }
  displayedColumns: string[] = [
    "position",
    "title",
    "description",
    "image",
    "history",
    "location",
    "rating",
    "menu",
  ];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

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
