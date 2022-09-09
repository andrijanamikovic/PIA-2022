import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
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
      // from: moment().format("MMM DD YY"),
      from:  Date.now(),
      to: Date.now() + 12096e5, //mozda ne ovo
      // to : moment().add(14, 'days').format("MMM DD YY"),
      back: false,
      dateBack: 0
    }
    console.log("Take:  ");
    console.log(data);
    // console.log(typeof(data.to));
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

    giveBack(book: Book){
      const data = {
        book:book,
        user:JSON.parse(localStorage.getItem('currentUser'))
      }
      return this.http.post(`${this.uri}/book/back`, data);
    }

    getReturned(user: User) {
      const data = {
        user: user
      }
      return this.http.post(`${this.uri}/book/returned`, data);
    }

    getReturnedBooks(user: User) {
      const data = {
        user: user
      }
      return this.http.post(`${this.uri}/book/returnedBooks`, data);
    }

}

