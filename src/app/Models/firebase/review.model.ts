export interface Review {
  id: string;
  last_activity_at: string;
  place_id: string | number;
  rating: number | string;
  remarks: string;
  uid: string;
}
