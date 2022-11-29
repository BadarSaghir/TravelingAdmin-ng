import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../Models/product';
import { ManageProductService } from '../../../services/manage-product.service';

interface IUser {
  name: string;
  nickname: string;
  image: string;
  price: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  manageProductData = {}
  Product = new Product('Xyz', '', '', '2345' );

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
  }

}


