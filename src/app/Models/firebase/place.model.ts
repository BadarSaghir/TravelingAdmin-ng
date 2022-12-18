export interface Place {
  description: string;
  history: string;
  id: string;
  images: string[];
  location: { latitude?: number; longitude?: number };
  rating: number | string;
  title: string;
  type: string;
  hotels: [
    {
      address: string;
      description: string;
      id: string;
      image: string;
      price: string;
      title: string;
    }
  ];
}


// 
// "Built in 1556 "
// 
// 0
// address
// "abbottabad pakistan"
// description
// "comfortable rooms for stay nearby. Warn water available with electricity and high-tea"
// id
// "some random"
// image
// "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/239879868.jpg?k=2e7e7eb4bc3745496fbf9ec13e4d7ba7bb15bf03ec8b0986d5676afab6456a26&o="
// price
// "1250"
// title
// "Hotel one"
// id
// "3BqVf8XIkAKo9TyH2xFf"
// images
// 0
// "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Lahore_Fort_view_from_Baradari.jpg/150px-Lahore_Fort_view_from_Baradari.jpg"
// (string)
// location
// [31.590278° N, 74.309722° E]
// rating
// 3
// title
// "Fort and Shalimar Gardens in Lahore"
// type
// "Fort"