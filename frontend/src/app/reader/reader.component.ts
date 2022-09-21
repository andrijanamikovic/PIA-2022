import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { Taken } from '../model/taken';
import { Took } from '../model/took';
import { MainService } from '../services/main.service';
import { TakeService } from '../services/take.service';
import { MatCardModule } from '@angular/material/card';
import { User } from '../model/user';
import { Days } from '../model/days';


@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})


export class ReaderComponent implements OnInit {

  constructor(private router: Router, private mainService: MainService, private takeService: TakeService) { }

  ngOnInit(): void {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    if (this.current == null) {
      this.router.navigate(['']);
    }
    localStorage.setItem('flag', 'true');
    this.mainService.getTop().subscribe((data: Book[]) => {
      this.books = data;
      let index;
      index = Math.floor(Math.random() * this.books.length);
      console.log(index);
      this.bookOfTheDay = this.books[index];
      console.log(this.bookOfTheDay);
      this.searched = false;
    })
    if (this.current != null) {
      this.takeService.getBorrowed(this.current).subscribe((data: Book[]) => {
        this.borrowedBooks = data;
        // console.log("Borrowed books");
        // console.log(this.borrowedBooks);
        this.mainService.getDays().subscribe((data: Days) => {
          this.days = data[0].days;
          this.takeService.taken(this.current).subscribe((data: Taken[]) => {
            this.taken = data;
            //hocu da spojim knjigu sa vremenom
            for (let i = 0; i <= this.borrowedBooks.length; i++) {
              let book: Book;
              book = this.borrowedBooks[i];
              console.log("Book: ");
              console.log(book);
              // console.log(book);
              for (let j = 0; j < this.taken.length; j++) {
                let took: Taken;
                took = this.taken[j];
                if (took.book == book._id) {
                  let now = Date.now();
                  let diff = Math.floor((now - took.from) / (1000 * 60 * 60 * 24));
                  console.log(diff);
                  diff = this.days * (took.extended ? 2 : 1) - diff;
                  if (diff < 0) {
                    localStorage.setItem('flag', 'false');
                  }
                  this.borrowed.push(new Took(book, diff, took.extended));
                }
                console.log("this borrowed books");
                console.log(this.borrowedBooks);
              }
            }
          })
        })
      })
    }
  }
  genres: string[];
  borrowed: Took[] = [];
  taken: Taken[] = [];
  books: Book[] = [];
  bookOfTheDay: Book;
  searchData: string[];
  searchedBooks: Book[] = [];
  clickedBook: Book;
  searched: boolean;
  date: String;
  current: User;
  days: number;

  searchBook(data) {
    //data.search mi je to sto treba da pretrazim delimicno kao authora ili kao naslov knjige
    this.searchedBooks = [];
    // console.log("Zanrovi: ", this.genres);
    if (data.search == "" && this.genres == null) {
      this.searched = false;
      return;
    }
    this.books.forEach(book => {
      this.searched = true;
      //godini izdanja
      if (data.search) {
        console.log("Datum: ", new Date(book.published).getFullYear());
        if (book.title.toLowerCase().match(data.search) != null || book.author.toLocaleLowerCase().match(data.search) || book.publisher.toLowerCase().match(data.search) != null) {
          // console.log(book);
          this.searchedBooks.push(book);
        } else {
          if (this.genres){
            if (book.genre in this.genres) {
              this.searchedBooks.push(book);
            }
          } else {
            let dates = data.search.toLowerCase().split('-');
            if (dates[0] && dates[1]) {
              if (new Date(book.published).getFullYear()>=dates[0] && new Date(book.published).getFullYear()<=dates[1]){
                this.searchedBooks.push(book);
              }
            } else if (dates[0]) {
              if (new Date(book.published).getFullYear()==dates[0]) {
                this.searchedBooks.push(book);
              }
            }
          }
        }
      }
      else if (this.genres) {
        this.genres.forEach(genre=>{
          if (book.genre.toLowerCase() == genre.toLowerCase()) {
            this.searchedBooks.push(book);
          }
        })
       
      }
    })
    console.log(this.searchedBooks);
  }

  showBook(book: Book) {
    // console.log("I clicked on book: ");
    // console.log(book);
    if (this.current.blocked) {
      return;
    }
    localStorage.setItem('ClickedBook', book.title);
    localStorage.setItem('Book', JSON.stringify(book));
    this.router.navigate(['/book']);
  }

  borrowedBooks: Book[] = [];
  noBorrowedBooks(){
    // console.log("Pozamljene: ", this.borrowed);
    return this.borrowed.length == 0;
  }

  public getColor(balance: Number): string {
    return balance > 0 ? "green" : "red";
  }

  giveBack(book: Book) {
    this.takeService.giveBack(book).subscribe((data: Book[]) => {
      this.borrowed = [];
      // this.taken = null;
      this.ngOnInit();
    })
  }


  history() {
    this.router.navigate(['/history']);
  }
  isModerator() {
    if (this.current.type == 2 || this.current.type == 1) {
      return true;
    } else {
      return false;
    }
  }

  addNewBook() {
    this.router.navigate(['/addBook']);
  }

  getDays() {
    this.mainService.getDays().subscribe((data: Days) => {
      console.log("Dani su bez broja...");
      console.log(data[0].days);
      return data.days;
    })
    return 12;
  }

  hasPhoto(user: Book) {
    if (user.photo == "")
      return false;
    else {
      return true;
    }
  }

  blocked(user: User) {
    if (user.blocked == null) {
      return false;
    }
    return user.blocked;
  }

  extend(book: Book) {
    this.takeService.extend(book, this.current).subscribe((resp) => {
      if (resp['message'] == 'ok') {
        this.borrowedBooks = [];
        this.borrowed = [];
        this.taken = [];
        this.ngOnInit();
      } else {
        //
      }
    })
  }

  
  addBook(){
    this.router.navigate(['/addBook']);
  }

  bookRequests(){
    this.router.navigate(['bookRequests']);
  }
  //


}
