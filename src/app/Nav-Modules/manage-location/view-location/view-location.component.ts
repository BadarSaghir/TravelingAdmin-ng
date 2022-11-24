import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';

export interface PeriodicElement {
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
  {position: 1, img: '../assets/images/admin.jpg', title: 'any title',    description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  {position: 2, img: '../assets/images/admin.jpg', title: 'any title', description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  {position: 3, img: '../assets/images/admin.jpg', title: 'any title',  description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  {position: 4, img: '../assets/images/admin.jpg', title: 'any title',  description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  {position: 5, img: '../assets/images/admin.jpg', title: 'any title',  description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  {position: 6, img: '../assets/images/admin.jpg', title: 'any title',  description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  {position: 7, img: '../assets/images/admin.jpg', title: 'any title',  description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  {position: 8, img: '../assets/images/admin.jpg', title: 'any title',   description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  {position: 9, img: '../assets/images/admin.jpg', title: 'any title',  description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
  {position: 10, img: '../assets/images/admin.jpg',title: 'any title', description: 'any description',  history: 'any history', location: 'any location', rating: 'rating star',   menu: ''},
];

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.css']
})
export class ViewLocationComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  displayedColumns: string[] = ['position', 'title', 'description', 'image', 'history', 'location', 'rating', 'menu'];
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
