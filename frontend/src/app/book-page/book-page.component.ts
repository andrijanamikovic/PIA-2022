import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.getTop().subscribe((data: Book[])=>{
      data.find(element => {
        if (element.title == localStorage.getItem('ClickedBook')) {
          this.clicked = element;
          return;
        }
      })

    })

  }

  clicked: Book;


}
