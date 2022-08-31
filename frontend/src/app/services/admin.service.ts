import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllPadding(){
    return this.http.get(`${this.uri}/admin/paddingRequest`);
  }

  approve(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/admin/approve`, data);
   
  }

  decline(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/admin/decline`, data);
  }

}
