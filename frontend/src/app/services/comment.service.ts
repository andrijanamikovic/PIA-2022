import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  canComment(book,user){
    const data = {
      user: user,
      book: book
    }
    return this.http.post(`${this.uri}/comment/canComment`, data);
  }

  addComment(comment,grade, user, book){
    const data = {
      user: user,
      book: book,
      comment: comment,
      grade: grade
    }
    return this.http.post(`${this.uri}/comment/addComment`, data);
  }

  
  getAll(book){
    const data = {
      book: book
    }
    return this.http.post(`${this.uri}/comment/getAll`, data);
  }

  
  editComment(comment,grade, user, book, edited, old){
    const data = {
      user: user,
      book: book,
      comment: comment,
      grade: grade,
      edited: edited,
      old:old
    }
    return this.http.post(`${this.uri}/comment/editComment`, data);
  }
}
