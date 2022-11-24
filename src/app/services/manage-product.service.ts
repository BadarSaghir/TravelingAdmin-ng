import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageProductService {
  private _registerUrl = "http://localhost:3000/api/register"

  constructor(private http: HttpClient) { }

  manageproduct(prodcut: any){
    return this.http.post<any>(this._registerUrl, prodcut)
  }
}
