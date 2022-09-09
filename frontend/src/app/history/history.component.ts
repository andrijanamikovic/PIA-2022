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
                        this.borrowed.push(new Returned(book, new Date(took.from), new Date(took.dateBack)));
                      }
                    console.log("this borrowed books");
                    console.log(this.returnedBooks);
                    this.borrowed = this.borrowed.sort((a, b) => {
                      const result = a.returned > b.returned ? 1 : -1;
                      return result;
                    });
                  }
                }
          })
      })
    }
  }


  borrowed: Returned[] = [];
  returnedBooks: Book[] = [];
  taken: Taken[] = [];
  reverse: Boolean[] = [false,false,false,false];

  showBook(book: Book) {
    console.log("I clicked on book: ");
    console.log(book);
    localStorage.setItem('ClickedBook', book.title);
    this.router.navigate(['/book']);
  }

  changeOrder(By : string) {
    //how to sort by...
    //i treba mi dal re reverse ili ne
    console.log("Before sort: ");
    console.log(this.borrowed);
    this.borrowed = this.borrowed.sort((a, b) => {
      if (By == 'title'){
        const result = a.book.title.localeCompare(b.book.title);
        this.reverse[0] = !this.reverse[0];
        return !this.reverse[0] ? -1*result:result;
      } else if (By == 'author') {
        const result = a.book.author.localeCompare(b.book.author);
        this.reverse[1] = !this.reverse[1];
        return !this.reverse[1] ? -1*result:result;
      } else if (By == 'Date returned') {
        const result = a.returned > b.returned ? 1 : -1;
        this.reverse[2] = !this.reverse[2];
        return !this.reverse[2] ? -1*result:result;
      } else if (By == 'Date took'){
        const result = a.returned > b.returned ? 1 : -1;
        this.reverse[3] = !this.reverse[3];
        return !this.reverse[3] ? -1*result:result;
      } else 
      return 0;
    })
    console.log("After sort: ");
    console.log(this.borrowed);
  }

}
