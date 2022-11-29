export interface Product {
  item: Item;
}

export interface Item {
  Description: string;
  id: string;
  pid: string | null;
  imageUrl: string;
  name: string;
  price: string;
}
