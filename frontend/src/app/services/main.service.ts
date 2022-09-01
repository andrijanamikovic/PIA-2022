import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';
  getTop(){
    return this.http.get(`${this.uri}/topThree`);
  }
}
