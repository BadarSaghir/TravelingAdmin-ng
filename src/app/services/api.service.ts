import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  url = "http://localhost:3000/categories";
  constructor(private http: HttpClient) {}

  getCategoryList() {
    return this.http.get(this.url);
  }

  deleteCategory(_id: string) {
    return this.http.delete(`${this.url}/${_id}`);
  }
}
