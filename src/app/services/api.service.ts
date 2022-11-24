import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "http://localhost:3000/categories";
  constructor(private http: HttpClient) { }

  addCategory(cat: Category)
  {
    return this.http.post(this.url, cat);
    
  }

  getCategoryList()
  {
    return this.http.get(this.url)
  }

  updateCategory(cat: Category)
  {
    return this.http.put(`${this.url}/${cat._id}`, cat)
  }

  deleteCategory(_id: string)
  {
    return this.http.delete(`${this.url}/${_id}` )
  }
}
