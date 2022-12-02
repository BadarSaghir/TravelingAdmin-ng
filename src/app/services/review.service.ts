import { Injectable } from "@angular/core";
import { Review } from "../Models/firebase/review.model";
import { PeriodicElement } from "../Nav-Modules/manage-review/view-review/view-review.component";
import { FireStoreService } from "./firebase/firestore.service";

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  constructor(public firestore: FireStoreService) {}
  public reviews: PeriodicElement[] = [];

  // registerUser(user: any) {
  //   return this.http.post<any>(this._registerUrl, user);
  // }

  public setDataInTable(
    fn?: (tmp: PeriodicElement[]) => void,
    ignoreUid?: string
  ) {
    this.firestore.getCollectionData<Review>("Reviews").subscribe((place) => {
      if (fn) {
        const temp = this.getPeriodicElements(place, ignoreUid);
        fn(temp);
      } else {
        this.getPeriodicElements(place, ignoreUid);
      }
    });
  }
  private getPeriodicElements(reviews: Review[], ignoreUid?: string) {
    this.reviews = [] as PeriodicElement[];
    console.log(reviews);
    reviews.forEach((review, idx) => {
      if (review.id != ignoreUid) {
        this.reviews.push({
          id: review.id,
          position: idx + 1,
          menu: "",
          rating: review.rating.toString() as string,
          title: review.remarks,
          userid: review.uid,
          placeid: review.place_id as string,
        });
      }
    });
    console.log(this.reviews);
    return this.reviews;
  }
}

// https://party-light-api.herokuapp.com/api/v1/products
