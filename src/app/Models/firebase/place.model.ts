export interface Place {
  description: string;
  history: string;
  id: string;
  images: string[];
  location: { latitude?: number; longitude?: number };
  rating: number | string;
  title: string;
  type: string;
}
