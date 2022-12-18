import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { serverTimestamp } from "@angular/fire/firestore";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GeoPoint, Timestamp } from "firebase/firestore";
import { firstValueFrom } from "rxjs";
import { Product } from "../../../Models/product";
import { ManageProductService } from "../../../services/manage-product.service";
import { Product as IProduct } from "../../../Models/firebase/product.model";
import { User } from "src/app/Models/firebase/user.model";
interface IUser {
  name: string;
  nickname: string;
  image: Array<File>;
  price: string;
  description: string;

  is_allowed: boolean;
  seller: string;
  title: string;
}

interface Seller {
  id: string;
  name: string;
}

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
  public sellers: Seller[] = [];
  showSpinner = false;
  manageProductData = {};
  Product = new Product("", "", "", "", false, "", "");

  reactiveForm!: FormGroup;
  user: IUser;

  constructor(
    private _auth: ManageProductService,
    public router: Router,
    public _angularFire: AngularFirestore,
    public storage: AngularFireStorage,
    public _angularAuth: AngularFireAuth
  ) {
    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this._angularFire
      .collection<User>("Users", (ref) =>
        ref.where("roles", "array-contains", "seller")
      )
      .valueChanges()
      .subscribe((s) => {
        s.map((ss) => {
          this.sellers.push({ id: ss.id, name: ss.name });
        });
      });

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
      description: new FormControl(this.user.description, [
        Validators.required,
        Validators.maxLength(10000),
      ]),

      is_allowed: new FormControl(this.user.is_allowed, [Validators.required]),
      title: new FormControl(this.user.title, [
        Validators.required,
        Validators.maxLength(10000),
      ]),

      seller: new FormControl(this.user.seller, [Validators.required]),
      image: new FormControl(this.user.image, [Validators.required]),
      price: new FormControl(this.user.price, [
        Validators.required,
        Validators.minLength(1),
      ]),
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

  get is_allowed() {
    return this.reactiveForm.get("is_allowed")!;
  }

  get is_allowedprice() {
    return this.reactiveForm.get("price")!;
  }

  get title() {
    return this.reactiveForm.get("title")!;
  }
  get description() {
    return this.reactiveForm.get("description")!;
  }
  get price() {
    return this.reactiveForm.get("price")!;
  }

  get seller() {
    return this.reactiveForm.get("seller")!;
  }

  get image() {
    return this.reactiveForm.get("image")!;
  }

  public async validate() {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    this.showSpinner = true;
    this.user = this.reactiveForm.value;

    // const location = new GeoPoint(this.lat, this.log);
    this.user = this.reactiveForm.value;
    // console.info(this.ManageUser);
    console.info("Name:", this.user.name);
    console.info("Nickname:", this.user.seller);
    console.info("isApproval:", this.user.is_allowed);

    console.info("Email:", this.user.image);
    console.info("Password:", this.user.price);
    console.info("lat:", this.user.title);
    console.info("log:", this.user.description);
    // this.angulatFire
    //   .createUserWithEmailAndPassword(this.user.email, this.user.password)
    //   .then(async (auth) => {
    let url = "";
    try {
      const id = this._angularFire.createId();
      const file = this.user.image[0];
      const fileRef = await this.storage.ref("Products").child(id);

      // Upload file in reference
      if (!!file) {
        const result = await fileRef.put(file);

        const currentImageUrl = await firstValueFrom(
          this.storage.ref(result.ref.fullPath).getDownloadURL()
        );
        url = currentImageUrl;
        this._angularFire
          .collection<IProduct>("Users")
          .doc(id)
          .set({
            id: id,
            description: this.user.description,
            image: url,
            price: this.user.price,
            is_allowed: this.user.is_allowed,
            seller: this.user.seller,
            title: this.user.title,
            publish_at: serverTimestamp() as Timestamp,

            // location: { latitude: this.lat, longitude: this.log },
          });
      }
    } catch (error) {
      url = "";
    }

    this.showSpinner = false;

    this.router.navigateByUrl("/manage-seller/seller^view");
    // })
    // .catch(() => {
    //   // this.showSpinner = false;
    // });
  }
}


