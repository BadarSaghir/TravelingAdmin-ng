import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageSellerService {

  private _registerUrl = "http://localhost:3000/api/register"
  constructor(private http: HttpClient) { }

  registerSeller(seller: any){
    return this.http.post<any>(this._registerUrl, seller)
  }
}
