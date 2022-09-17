import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.mainService.getTop().subscribe((data: Book[])=>{
      this.books = data;
      this.top3 = this.books.slice(0, 3);
      this.searched = false;
    })
  }

  books: Book[] = []
  top3: Book[] = [];

  searchData: string[];
  searchedBooks: Book[] = [];
  current: Book; 
  searched: boolean;
  
  searchBook(data){
    //data.search mi je to sto treba da pretrazim delimicno kao authora ili kao naslov knjige
    this.searchedBooks = [];
    if (data.search=="") {
      this.searched = false;
      return;
    }
    this.books.forEach(book => {
      this.searched = true;
      if (book.title.toLowerCase().match(data.search)!= null || book.author.toLocaleLowerCase().match(data.search)) {
        console.log(book);
        this.searchedBooks.push(book);
      }
    })
  }

  hasPhoto(user: Book){
    if (user.photo=="")
      return false;
    else {
      return true;
    }
  }
}
