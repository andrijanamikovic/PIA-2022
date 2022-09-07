import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { MainService } from '../services/main.service';
import { TakeService } from '../services/take.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(private router: Router, private mainService: MainService, private takeService: TakeService) { }

  ngOnInit(): void {
    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (current == null) {
      this.router.navigate(['']);
    }

    this.mainService.getTop().subscribe((data: Book[]) => {
      this.books = data;
      let index;
      index = Math.floor(Math.random() * this.books.length);
      console.log(index);
      this.bookOfTheDay = this.books[index];
      console.log(this.bookOfTheDay);
      this.searched = false;
    })
    if (current != null) {
      this.takeService.getBorrowed(current).subscribe((data: Book[]) => {
        this.borrowedBooks = data;
        console.log(this.borrowedBooks);
      })
    }
  }

  books: Book[] = [];
  bookOfTheDay: Book;
  searchData: string[];
  searchedBooks: Book[] = [];
  clickedBook: Book;
  searched: boolean;

  searchBook(data) {
    //data.search mi je to sto treba da pretrazim delimicno kao authora ili kao naslov knjige
    this.searchedBooks = [];
    if (data.search == "") {
      this.searched = false;
      return;
    }
    this.books.forEach(book => {
      this.searched = true;
      if (book.title.toLowerCase().match(data.search) != null || book.author.toLocaleLowerCase().match(data.search)) {
        console.log(book);
        this.searchedBooks.push(book);
      }
    })
  }

  showBook(book: Book) {
    console.log("I clicked on book: ");
    console.log(book);
    localStorage.setItem('ClickedBook', book.title);
    this.router.navigate(['/book']);
  }

  borrowedBooks: Book[] = [];
}
