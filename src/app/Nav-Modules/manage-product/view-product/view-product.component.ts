import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';

export interface PeriodicElement {
  name: string;
  description: string;
  position: number;
  img: string;
  price: string;
  menu: string;

}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, img: '../assets/images/admin.jpg', name: 'product name', description: 'Short description',  price: 'any price', menu: ''},
  {position: 2, img: '../assets/images/admin.jpg', name: 'product name', description: 'Short description',  price: 'any price', menu: ''},
  {position: 3, img: '../assets/images/admin.jpg', name: 'product name', description: 'Short description',  price:'iany price', menu: ''},
  {position: 4, img: '../assets/images/admin.jpg', name: 'product name', description: 'Short description',  price: 'any price', menu: ''},
  {position: 5, img: '../assets/images/admin.jpg', name: 'product name', description: 'Short description',  price: 'any price', menu: ''},
  {position: 6, img: '../assets/images/admin.jpg', name: 'product name', description: 'Short description',  price: 'any price', menu: ''},
  {position: 7, img: '../assets/images/admin.jpg', name: 'product name', description: 'Short description',  price: 'any price', menu: ''},
  {position: 8, img: '../assets/images/admin.jpg', name: 'product name', description: 'Short description',  price: 'any price', menu: ''},
  {position: 9, img: '../assets/images/admin.jpg', name: 'product name', description: 'Short description',  price: 'any price', menu: ''},
  {position: 10, img: '../assets/images/admin.jpg', name:'product name', description: 'Short description',  price: 'any price', menu: ''},
];

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  displayedColumns: string[] = ['position', 'name', 'description', 'image', 'price', 'menu'];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
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

