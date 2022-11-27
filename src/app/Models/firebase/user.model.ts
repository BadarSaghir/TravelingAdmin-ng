export interface User {
  email: string;
  firstName: string;
  role?: string;
  secondName: string;
  uid: string;
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
