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
    })
  }

  books: Book[] = []
  top3: Book[] = [];

}
