import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { Returned } from '../model/returned';
import { Taken } from '../model/taken';
import { Took } from '../model/took';
import { MainService } from '../services/main.service';
import { TakeService } from '../services/take.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private router: Router, private mainService: MainService, private takeService: TakeService) { }

  ngOnInit(): void {
    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (current == null) {
      this.router.navigate(['']);
    }
    if (current != null) {
      this.takeService.getReturned(current).subscribe((data: Taken[]) => {
        this.taken = data;
        console.log("returned data: ");
        console.log(data);
        //ovo treba da spojim sa tabelom za knjige da bih mogla da ispisem kako treba
        //preko onoga took kao u reader.ts
          this.takeService.getReturnedBooks(current).subscribe((books: Book[]) => {
            this.returnedBooks = books;
            console.log("Returned books");
            console.log(this.returnedBooks);

              for (let i =0; i<=this.returnedBooks.length; i++){
                let book: Book;
                book = this.returnedBooks[i];
                console.log("Book: ");
                console.log(book);
                // console.log(book);
                  for (let j= 0; j<this.taken.length; j++){
                    let took:Taken;
                    took = this.taken[j];
                      if (took.book == book._id) {
                        this.borrowed.push(new Returned(book,took.from, took.dateBack));
                      }
                    console.log("this borrowed books");
                    console.log(this.returnedBooks);
                  }
                }
          })
      })
    }
  }


  borrowed: Returned[] = [];
  returnedBooks: Book[] = [];
  taken: Taken[] = [];

  showBook(book: Book) {
    console.log("I clicked on book: ");
    console.log(book);
    localStorage.setItem('ClickedBook', book.title);
    this.router.navigate(['/book']);
  }

}
