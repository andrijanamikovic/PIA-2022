import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { Taken } from '../model/taken';
import { Took } from '../model/took';
import { MainService } from '../services/main.service';
import { TakeService } from '../services/take.service';
import { MatCardModule } from '@angular/material/card';


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
        console.log("Borrowed books");
        console.log(this.borrowedBooks);
      
      this.takeService.taken(current).subscribe((data: Taken[]) => {
        this.taken = data;
              //hocu da spojim knjigu sa vremenom
      for (let i =0; i<=this.borrowedBooks.length; i++){
        let book: Book;
        book = this.borrowedBooks[i];
        console.log("Book: ");
        console.log(book);
        // console.log(book);
          for (let j= 0; j<this.taken.length; j++){
            let took:Taken;
            took = this.taken[j];
          if (took.book == book._id) {
            let now = Date.now();
            let diff = Math.floor((now - took.from) / (1000*60*60*24));
            console.log(diff);
            diff = current.days - diff;
            this.borrowed.push(new Took(book,diff));
          }
        console.log("this borrowed books");
        console.log(this.borrowedBooks);
      }
    }
      })
    })
  }
  }

  borrowed: Took[] = [];
  taken: Taken[] = [];
  books: Book[] = [];
  bookOfTheDay: Book;
  searchData: string[];
  searchedBooks: Book[] = [];
  clickedBook: Book;
  searched: boolean;
  date: String;

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
 
  public getColor(balance: Number): string{
    return balance > 0 ? "green" : "red";
 }

 giveBack(book: Book) {
    this.takeService.giveBack(book).subscribe((data: Book[]) => {
      this.borrowed = [];
      // this.taken = null;
      this.ngOnInit();
    })
  }


  history(){
    this.router.navigate(['/history']);
  }

}
