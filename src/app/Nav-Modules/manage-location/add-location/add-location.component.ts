import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageLocation } from '../../../Models/manage-location';
import { ManageProductService } from '../../../services/manage-product.service';

interface IUser {
  price: any;
  name: string;
  nickname: string;
  image: string;
  history: string;
  location: string;
  rating: string;
}

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {


  manageProductData = {}
  ManageLocation = new ManageLocation('tz', 'description', '', 'history', 'location', 'rating', );

  reactiveForm!: FormGroup;
  user: IUser;

  constructor(private _auth: ManageProductService) {
    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      nickname: new FormControl(this.user.nickname, [
        Validators.required,
        Validators.maxLength(10000),
      ]),
      image: new FormControl(this.user.image, [
        Validators.required,
      ]),
      price: new FormControl(this.user.price, [
        Validators.required,
        Validators.minLength(1),
      ]),
      location: new FormControl(this.user.location, [
        Validators.required,
        Validators.minLength(1),
      ]),
      rating: new FormControl(this.user.rating, [
        Validators.required,

      ]),
    });
  }

  manageproduct(){
    // this._auth.manageproduct(this.manageProductData)
    // .subscribe(
    //   res => console.log(res),
    //   err => console.log(err)
    // )
  }

  get name() {
    return this.reactiveForm.get('name')!;
  }

  get nickname() {
    return this.reactiveForm.get('nickname')!;
  }

  get image() {
    return this.reactiveForm.get('image')!;
  }

  get price() {
    return this.reactiveForm.get('price')!;
  }
  get location() {
    return this.reactiveForm.get('location')!;
  }
  get rating() {
    return this.reactiveForm.get('rating')!;
  }

  public validate(): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }

    this.user = this.reactiveForm.value;

    console.info('Name:', this.user.name);
    console.info('nickname:', this.user.nickname);
    console.info('image:', this.user.image);
    console.info('price:', this.user.price);
    console.info('location:', this.user.location);
  }

}
