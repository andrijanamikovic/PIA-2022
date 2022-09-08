import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class TakeService {

  constructor(private http: HttpClient) { }


  uri = 'http://localhost:4000';
  take(book: Book, user: User){
    const data = {
      book:book,
      user:user,
      from:  new Date().toLocaleDateString(),
      to: new Date(+new Date + 12096e5).toLocaleDateString(),
      back: false
    }
    console.log("Take:  ");
    console.log(data);
    console.log(typeof(data.to));
    return this.http.post(`${this.uri}/book/take`, data);

  }


  getBorrowed(user: User) {
    const data = {
      user: user
    }
    return this.http.post(`${this.uri}/book/borrowed`, data);
  }

    taken(user: User){
      const data = {
        user: user
      }
      return this.http.post(`${this.uri}/book/taken`, data);
    }

}

