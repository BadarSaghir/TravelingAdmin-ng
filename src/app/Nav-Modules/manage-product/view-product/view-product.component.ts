import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import { map, Observable, ReplaySubject, switchMap } from "rxjs";
import { Product } from "src/app/Models/firebase/product.model";
import { FireStoreService } from "src/app/services/firebase/firestore.service";
import { ManageProductService } from "src/app/services/manage-product.service";
import {
  collection,
  collectionData,
  collectionGroup,
  deleteDoc,
  doc,
  Firestore,
} from "@angular/fire/firestore";
import { CollectionsTypes } from "src/app/shared/types/collection.type";

export interface PeriodicElement extends Product {
  position: number;
  menu: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: "app-view-product",
  templateUrl: "./view-product.component.html",
  styleUrls: ["./view-product.component.css"],
})
export class ViewProductComponent implements OnInit {
  ngOnInit(): void {
    // this.productService.setDataInTable((tmp) => {
    //   this.dataSource.setData(tmp);
    // });
    this.productService.setDataInTable((tmp) => {
      this.dataSource.setData(tmp);
    });
    const selected: CollectionsTypes = "";
    // this.firestore.getCollectionGroup((AngularStore, fireStore) => {
    // const ref = collectionData(collectionGroup(fireStore, "items"));
    // console.log(
    //   ref.forEach((docs) => {
    //     console.log(docs);
    //   })
    // );
    // });
  }

  constructor(
    private firestore: FireStoreService,
    public productService: ManageProductService,
    private store: Firestore
  ) {}

  deleteProduct(id: string, pid: string | null) {
    if (pid)
      this.firestore.deleteDocument(`products/${id}/items`, { uid: pid });
    console.log("id", id);
    console.log("pid", pid);

    // deleteDoc(doc(collection(this.store, "products", id, "items"), pid));
  }

  displayedColumns: string[] = [
    "position",
    "name",
    "description",
    "image",
    "price",
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

