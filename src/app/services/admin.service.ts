import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }
  postAdmin(data: any)
  {
    return this.http.post<any>(environment.apiBaseUrl + "/adminList/", data);
  }
  getAdmin()
  {
    return this.http.get<any>(environment.apiBaseUrl + "/adminList/");
  }
  putAdmin(data:any, id : number){
    return this.http.put<any>(environment.apiBaseUrl + "/adminList/"+id, data);
  }
  deleteAdmin(id: number)
  {
    return this.http.delete<any>(environment.apiBaseUrl + "/adminList/"+id)
  }
}
