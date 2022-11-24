import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }
  postOrder(data: any)
  {
    return this.http.post<any>(environment.apiBaseUrl + "/orderList/", data);
  }
  getOrder()
  {
    return this.http.get<any>(environment.apiBaseUrl + "/orderList/");
  }
  putOrder(data:any, id : number){
    return this.http.put<any>(environment.apiBaseUrl + "/orderList/"+id, data);
  }
  deleteOrder(id: number)
  {
    return this.http.delete<any>(environment.apiBaseUrl + "/orderList/"+id)
  }
}
