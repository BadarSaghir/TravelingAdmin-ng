import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  product: any;
  
  constructor(private http: HttpClient) { }

  updateProduct(value: any) {
    throw new Error('Method not implemented.');
  }

  // addProduct(value: any) {
  //   throw new Error('Method not implemented.');
  // }

  addProduct(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(this.url, product)
  }; 

  private url:string = "https://mamas-kids.herokuapp.com/api/products";

  getproduct():Observable<Product[]>{
    return this.http.get<Product[]>(this.url)
  }

}








  // https://party-light-api.herokuapp.com/api/v1/products
