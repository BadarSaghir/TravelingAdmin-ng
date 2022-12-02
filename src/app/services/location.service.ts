import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/Models/product";
import { Place } from "../Models/firebase/place.model";
import { PeriodicElement } from "../Nav-Modules/manage-location/view-location/view-location.component";
import { CollectionsTypes } from "../shared/types/collection.type";
import { FireStoreService } from "./firebase/firestore.service";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  constructor(public firestore: FireStoreService) {}
  public location: PeriodicElement[] = [];

  // registerUser(user: any) {
  //   return this.http.post<any>(this._registerUrl, user);
  // }

  public setDataInTable(
    fn?: (tmp: PeriodicElement[]) => void,
    ignoreUid?: string
  ) {
    this.firestore.getCollectionData<Place>("Places").subscribe((place) => {
      if (fn) {
        const temp = this.getPeriodicElements(place, ignoreUid);
        fn(temp);
      } else {
        this.getPeriodicElements(place, ignoreUid);
      }
    });
  }
  private getPeriodicElements(places: Place[], ignoreUid?: string) {
    this.location = [] as PeriodicElement[];
    this.firestore.totalPlaces = 0;
    places.forEach((place, idx) => {
      if (place.id != ignoreUid) {
        this.firestore.totalPlaces++;
        this.location.push({
          position: idx + 1,
          history: place.history,
          img: place.images[0],
          location: place.location
            ? place.location.latitude + " " + place.location.longitude
            : "",

          rating: place.rating as string,
          title: place.title,
          id: place.id,
          menu: "",
          description: place.description,
        });
      }
    });
    // console.log(this.location);
    return this.location;
  }
}

// https://party-light-api.herokuapp.com/api/v1/products
