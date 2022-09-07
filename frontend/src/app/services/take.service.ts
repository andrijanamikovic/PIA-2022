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
      to: new Date(+new Date + 12096e5).toLocaleDateString()
    }
    console.log("Take:  ");
    console.log(data);
    return this.http.post(`${this.uri}/book/take`, data);

  }
}

