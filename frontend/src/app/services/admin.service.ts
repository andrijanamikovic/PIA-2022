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

  addUser(firstname, lastname, username, password, address, phone, email, photo, type){
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      type: 0,
      address:address,
      phone: phone,
      email: email,
      photo: photo
    }
    return this.http.post(`${this.uri}/admin/addUser`, data);

  }

  changeDays(days){
    const data = {
      days: days
    }
    return this.http.post(`${this.uri}/admin/changeDays`, data);
  }

  extend(extend) {
    const data = {
      days: extend
    }
    return this.http.post(`${this.uri}/admin/extendDays`, data);
  }

  delete(book){
    const data = {
      book:book
    }
    return this.http.post(`${this.uri}/book/delete`, data);
  }
}
