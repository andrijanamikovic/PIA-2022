import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { AdminService } from '../services/admin.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  constructor(private router: Router, private mainService: MainService, private adminService: AdminService) { }

  ngOnInit(): void {
    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (current == null) {
      this.router.navigate(['']);
    }
    this.mainService.getTop().subscribe((data: Book[]) => {
      this.books = data;
  })}

  books: Book[] = [];
  editBook(clicked: Book) {
    localStorage.setItem('ClickedBook', clicked.title);
    localStorage.setItem('Book', JSON.stringify(clicked));
    this.router.navigate(['/editBook']);
  }

  delete(book: Book) {
    console.log(book);
    this.adminService.delete(book).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.ngOnInit();
      } else {
        
      }
    })
  }

  borrowed(book: Book) {
    return book.borrowed == 0;
  }
}
