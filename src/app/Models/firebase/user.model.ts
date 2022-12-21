import { GeoPoint, Timestamp } from "firebase/firestore";

export interface User {
  email_address: string;
  id: string;
  is_deleted: boolean;
  image_url: string;
  is_allowed: boolean;
  joined_at: Timestamp;
  location?: GeoPoint | null;
  name: string;
  roles: string[];
}


export interface Seller {
  email: string;
  firstName: string;
  isApprove: boolean;
  secondName: string;
  uid: string;
}

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
