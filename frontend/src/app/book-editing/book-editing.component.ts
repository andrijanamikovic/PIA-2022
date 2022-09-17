import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { User } from '../model/user';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-book-editing',
  templateUrl: './book-editing.component.html',
  styleUrls: ['./book-editing.component.css']
})
export class BookEditingComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    if (this.current == null) {
      this.router.navigate(['']);
    }
    else if (this.current.type == 0) {
      this.router.navigate(['']);
    }
    this.book = JSON.parse(localStorage.getItem('Book'));
  }

  book: Book;
  current: User;

  newBook: Book = new Book();
  message: string;

  getNewBook(){
    this.book = JSON.parse(localStorage.getItem('Book'));
  }

  submit() { 
    Object.keys(this.book).forEach(i=>{
      if (this.newBook[i] == undefined) {
        this.newBook[i] = this.book[i];
      }
    })
    if(!this.picture ||this.picture.length == 0){
  
      this.picture = "";
  
    } 

    this.newBook.photo = this.picture;


    this.adminService.edit(this.newBook).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.message = 'Book edited';
      } else {
        this.message = 'Error in editing book';
      }
    })
  }

  picture:string;

  saveImage(event){
    
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
    let file = event.target.files[0];

    let img = new Image();

    img.src = window.URL.createObjectURL( file );
    reader.readAsDataURL(file);
    reader.onload = () => {
        window.URL.revokeObjectURL( img.src );
        this.picture = reader.result as string;   
      };
    }
  }
}
