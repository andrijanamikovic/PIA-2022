import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { User } from '../model/user';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-book-editing',
  templateUrl: './book-editing.component.html',
  styleUrls: ['./book-editing.component.css']
})
export class BookEditingComponent implements OnInit {

  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit(): void {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    if (this.current == null) {
      this.router.navigate(['']);
    }
    else if (this.current.type == 0) {
      this.router.navigate(['']);
    }
    this.book = JSON.parse(localStorage.getItem('Book'));
    console.log("Book in editing: ");
    console.log(this.book);
  }

  book: Book;
  current: User;

  newBook: Book = new Book();
  message: string;

  getNewBook(){
    this.book = JSON.parse(localStorage.getItem('Book'));
    console.log("Book in editing: ");
    
    console.log(this.book);
  }

  submit() {
    //fali mi logika za submit nove knjige
    //moram da vidim sta da radim za sliku
    
      
    Object.keys(this.book).forEach(i=>{
      if (this.newBook[i] == undefined) {
        this.newBook[i] = this.book[i];
      }
    })
    console.log("Submit: ");
    console.log(this.newBook);
  }
}
