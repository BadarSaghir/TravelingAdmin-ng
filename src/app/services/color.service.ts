import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Color } from '../Models/Color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  url = "http://localhost:3000/colors";
  constructor(private http: HttpClient) { }

  addColor(col: Color)
  {
    return this.http.post(this.url, col);
    
  }

  getColorList()
  {
    return this.http.get(this.url)
  }

  updateColor(col: Color)
  {
    return this.http.put(`${this.url}/${col._id}`, col)
  }

  deleteColor(_id: string)
  {
    return this.http.delete(`${this.url}/${_id}` )
  }
}
