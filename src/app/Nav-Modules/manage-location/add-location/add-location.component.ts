import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { GeoPoint } from "@angular/fire/firestore";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { async } from "@firebase/util";
import { read } from "fs";
import { firstValueFrom } from "rxjs";
import { Place } from "src/app/Models/firebase/place.model";
import { ManageLocation } from "../../../Models/manage-location";
import { ManageProductService } from "../../../services/manage-product.service";

interface IUser {
  price: any;
  name: string;
  nickname: string;
  rating: string;
  description: string;
  history: string;
  id?: string;
  images: string[];
  type: string;
  hotels: [
    {
      address: string;
      description: string;
      id: string;
      image: string;
      price: string;
      title: string;
    }
  ];
  location: GeoPoint;
  lat: number;
  log: number;
}

@Component({
  selector: "app-add-location",
  templateUrl: "./add-location.component.html",
  styleUrls: ["./add-location.component.css"],
})
export class AddLocationComponent implements OnInit {
  public showSpinner = false;
  manageProductData = {};
  ManageLocation = new ManageLocation("", "", "", "", "", "");

  public reactiveForm!: FormGroup;
  user: IUser;

  constructor(
    private _auth: ManageProductService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private _angularFirestore: AngularFirestore,
    private router: Router
  ) {
    this.user = {} as IUser;
    this.user.location = new GeoPoint(0, 0);
  }
  async deleteImage(index: number) {
    const imagesArray = this.reactiveForm.get("images") as FormArray;
    const value = imagesArray.controls[index].value;
    const fileRef = this.storage.storage.refFromURL(value);
    await fileRef.delete();
    console.log(value);
    imagesArray.removeAt(index);
  }

  async deleteHotelImage(index: number) {
    const hotelsArray = this.reactiveForm.get("hotels") as FormArray;
    const value = hotelsArray.controls[index].get("image")?.value;
    const fileRef = this.storage.storage.refFromURL(value);
    await fileRef.delete();
    console.log(value);
    hotelsArray.controls[index].get("image")?.setValue("");
  }

  addImage(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const imagesArray = this.reactiveForm.get("images") as FormArray;
      console.log(file.name);
      const filePath = "images/" + file.name;
      const task = await this.storage.upload(filePath, file);
      const path = await firstValueFrom(
        await this.storage.ref(task.ref.fullPath).getDownloadURL()
      );
      console.log(path);
      // const path = (await task).metadata.fullPath;
      // console.log(reader.readAsDataURL(file));
      // console.log(reader.result);
      imagesArray.push(new FormControl(path));
    };
    reader.readAsDataURL(file);
  }

  addHotelImage(event: any, index: number) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const imagesArray = this.reactiveForm.get("hotels") as FormArray;
      const filePath = "images/hotels/" + file.name;
      const task = await this.storage.upload(filePath, file);
      const path = await firstValueFrom(
        await this.storage.ref(task.ref.fullPath).getDownloadURL()
      );
      (await task).metadata.fullPath;
      console.log(path);

      imagesArray.controls[index].get("image")?.setValue(path);
    };
    reader.readAsDataURL(file);
  }
  ngOnInit(): void {
    this.showSpinner = false;
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.user.name),
      nickname: new FormControl(this.user.nickname),
      images: this.fb.array([]) as FormArray,
      history: new FormControl(this.user.history),
      location: new FormControl(this.user.location),
      lat: new FormControl(this.user.location.latitude),
      log: new FormControl(this.user.location.longitude),
      type: new FormControl(this.user.type),

      rating: new FormControl(this.user.rating),
      hotels: this.fb.array([]) as FormArray,
    });
  }

  manageproduct() {
    // this._auth.manageproduct(this.manageProductData)
    // .subscribe(
    //   res => console.log(res),
    //   err => console.log(err)
    // )
  }

  get name() {
    return this.reactiveForm.get("name")!;
  }

  get nickname() {
    return this.reactiveForm.get("nickname")!;
  }

  get images() {
    return this.reactiveForm.get("images") as FormArray;
  }
  image(i: number) {
    return (this.reactiveForm.get("hotels") as FormArray).controls[i].get(
      "image"
    );
  }
  get price() {
    return this.reactiveForm.get("price")!;
  }
  get location() {
    return this.reactiveForm.get("location")!;
  }
  get lat() {
    return this.reactiveForm.get("lat")!;
  }

  get log() {
    return this.reactiveForm.get("log")!;
  }
  get rating() {
    return this.reactiveForm.get("rating")!;
  }

  public async validate() {
    this.showSpinner = true;
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    try {
      this.user = this.reactiveForm.value;
      console.info("Name:", this.user);
      const id = this._angularFirestore.createId();

      console.info("Name:", this.user.name);
      console.info("nickname:", this.user.nickname);
      console.info("image:", this.user.images);
      console.info("price:", this.user.price);
      console.info("location:", this.user.location);

      const hotels = this.user.hotels.forEach((hotel, v) => {
        this.user.hotels[v].price = this.user.hotels[v].price.toString();

        return hotel;
      });
      await this._angularFirestore
        .collection<Place>("Places")
        .doc(id)
        .set({
          description: this.user.nickname,
          history: this.user.history,
          hotels: this.user.hotels,
          id: id,
          images: this.user.images,
          location: new GeoPoint(this.user.lat, this.user.log),
          rating: this.user.rating,
          title: this.user.name,
          type: this.user.type,
        });
      this.router.navigateByUrl("/manage-location/View^location");
    } catch (error) {}
    this.showSpinner = false;
  }

  addHotel() {
    const id = this._angularFirestore.createId();
    const hotelForm = this.fb.group({
      address: [""],
      description: "",
      id: id,
      image: "",
      price: ["0"],
      title: [""],
    });
    this.hotels.push(hotelForm);
  }
  removeHotel(i: number) {
    this.hotels.removeAt(i);
  }

  get hotels() {
    return this.reactiveForm.get("hotels") as FormArray;
  }
}
