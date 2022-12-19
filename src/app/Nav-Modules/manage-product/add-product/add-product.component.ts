import { Component, OnDestroy, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { serverTimestamp } from "@angular/fire/firestore";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GeoPoint, Timestamp } from "firebase/firestore";
import { firstValueFrom, Subscription } from "rxjs";
import { Product } from "../../../Models/product";
import { ManageProductService } from "../../../services/manage-product.service";
import { Product as IProduct } from "../../../Models/firebase/product.model";
import { User } from "src/app/Models/firebase/user.model";
interface IUser {
  name: string;
  nickname: string;
  image: string;
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
export class AddProductComponent implements OnInit, OnDestroy {
  public sellers: Seller[] = [];
  showSpinner = false;
  useDefualt = true;
  manageProductData = {};
  Product = new Product("", "", "", "", false, "", "");
  public selectedFiles: Array<File> = [];
  sub?: Subscription;
  reactiveForm!: FormGroup;
  user: IUser;
  img = "";
  isEdit = false;
  previousProduct?: IProduct;
  id = "";
  constructor(
    private _auth: ManageProductService,
    public router: Router,
    public _angularFire: AngularFirestore,
    private route: ActivatedRoute,
    public storage: AngularFireStorage,
    public _angularAuth: AngularFireAuth
  ) {
    this.user = {} as IUser;
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  async ngOnInit() {
    this.showSpinner = true;

    this._angularFire
      .collection<User>("Users", (ref) =>
        ref.where("roles", "array-contains", "seller")
      )
      .valueChanges()
      .subscribe((s) => {
        this.Product.seller = s[0].id;
        s.map((ss) => {
          this.sellers.push({ id: ss.id, name: ss.name });
        });
      });

    this.sub = this.route.paramMap.subscribe(async (m) => {
      console.log(m.get("id"));
      const id = m.get("id");
      if (id) {
        this.showSpinner = true;
        this.isEdit = true;
        const product = await firstValueFrom(
          await this._angularFire.collection<IProduct>("Products").doc(id).get()
        );

        const data = await product.data();
        this.previousProduct = data;
        // console,

        if (data) {
          this.Product.id = data?.id;
          this.Product.description = data.description;
          this.Product.image = "";
          this.Product.is_allowed = data.is_allowed;
          this.Product.name = data.title;
          this.Product.title = data.title;
          this.Product.price = data.price;
          this.Product.seller = data.seller;
          this.img = data.image;
          this.user.image = data.image;
          this.sellers;
          this.isEdit = true;
        } else {
          // if (!this.isEdit)
          this.isEdit = false;
          this.showSpinner = false;

          this.router.navigateByUrl("/manage-product/View^product");
        }
      }
    });

    this.showSpinner = false;
    this.reactiveForm = new FormGroup({
      description: new FormControl(this.user.description),

      is_allowed: new FormControl(this.user.is_allowed),
      title: new FormControl(this.user.title, [
        Validators.required,
        Validators.minLength(3),
      ]),

      seller: new FormControl(this.user.seller),
      image: this.isEdit
        ? new FormControl(this.user.image)
        : new FormControl(this.user.image, [Validators.required]),
      price: new FormControl(this.user.price, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });

    console.log("file", this.selectedFiles[0]);
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
  onFileChosen(event: any) {
    this.selectedFiles = event.target.files;
    this.useDefualt = false; // just assigns the selected file/s in <input> this.selectedFiles
  }

  public async validate() {
    console.log("validate");
    if (this.reactiveForm.invalid) {
      console.log("reactiveForm.invalid validate");
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

    const id = this._angularFire.createId();
    const file = this.selectedFiles[0];
    const fileRef = await this.storage.ref("Products").child(id);

    // Upload file in reference
    let currentImageUrl = "";
    if (!!file) {
      const result = await fileRef.put(file);

      currentImageUrl = await firstValueFrom(
        await this.storage.ref(result.ref.fullPath).getDownloadURL()
      );

      url = currentImageUrl;
      await this._angularFire
        .collection<IProduct>("Products")
        .doc(id)
        .set({
          id: id,
          description: this.user.description,
          image: url,
          price: this.user.price,
          is_allowed: this.user.is_allowed,
          seller: this.Product.seller,
          title: this.user.title,
          published_at: serverTimestamp() as Timestamp,

          // location: { latitude: this.lat, longitude: this.log },
        });
    }

    this.showSpinner = false;

    this.router.navigateByUrl("/manage-product/View^product");
    // })
    // .catch(() => {
    //   // this.showSpinner = false;
    // });
  }

  public async edit() {
    console.log("validate");
    if (this.reactiveForm.invalid) {
      console.log("reactiveForm.invalid validate");
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
    if (this.selectedFiles[0]) {
      const file = this.selectedFiles[0];
      const fileRef = this.storage
        .ref("Products")
        .child(this.previousProduct?.id as string);

      // Upload file in reference
      if (!!file) {
        const result = await fileRef.put(file);

        url = await firstValueFrom(
          await this.storage.ref(result.ref.fullPath).getDownloadURL()
        );
      } else {
        url = this.img;
      }
    }

    await this._angularFire
      .collection<IProduct>("Products")
      .doc(this.previousProduct?.id)
      .update({
        id: this.previousProduct?.id,
        description: this.user.description,
        image: this.useDefualt ? this.img : url,
        price: this.user.price,
        is_allowed: this.user.is_allowed,
        seller: this.Product.seller,
        title: this.user.title,
        published_at: serverTimestamp() as Timestamp,

        // location: { latitude: this.lat, longitude: this.log },
      });

    this.showSpinner = false;

    this.router.navigateByUrl("/manage-product/View^product");
    // })
    // .catch(() => {
    //   // this.showSpinner = false;
    // });
  }
}
