import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  url = "http://localhost:3000/colors";
  constructor(private http: HttpClient) { }

  

  getColorList()
  {
    return this.http.get(this.url)
  }



  deleteColor(_id: string)
  {
    return this.http.delete(`${this.url}/${_id}` )
  }
}
