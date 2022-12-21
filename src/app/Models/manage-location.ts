import { GeoPoint } from "firebase/firestore";
import { Place } from "./firebase/place.model";

export class ManageLocation {
  constructor(
    public title: string,
    public description: string,
    public image: string,
    public history: string,
    public location: string | GeoPoint,
    public rating: string,
    id?: string,
    images?: string[],
    type?: string,
    hotels?: [
      {
        address: string;
        description: string;
        id?: string;
        image: string;
        price: string;
        title: string;
      }
    ]
  ) {}
}
