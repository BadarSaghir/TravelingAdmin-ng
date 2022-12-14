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
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

export interface PeriodicElement extends Product {
  position: number;
  menu: string;
  sellerName?: string;
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
    // const selected: CollectionsTypes = "";
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
    public router: Router,
    public dialog: MatDialog,
    private store: Firestore
  ) {}

  deleteProduct(id: string) {
    this.firestore.deleteDocument(`Products`, { uid: id });
    console.log("id", id);

    // deleteDoc(doc(collection(this.store, "products", id, "items"), pid));
  }

  displayedColumns: string[] = [
    "position",
    "name",
    "description",
    "image",
    "publish",
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
  editProduct(id: string) {
    this.router.navigateByUrl("/manage-product/Edit^product/" + id);
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

