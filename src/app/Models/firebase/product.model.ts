import { Timestamp } from "@angular/fire/firestore";

export interface Product {
  title: string;
  seller: string;
  description: string;
  id: string;
  is_allowed: boolean;
  image: string;
  price: string;
  published_at: Timestamp;
}
