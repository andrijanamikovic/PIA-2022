import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (current == null) {
      this.router.navigate(['']);
    }
    else if (current.type == 0) {
      this.router.navigate(['']);
    }
  }

  newBook: Book = new Book();
  picture: string;
  message:string;

  submit(){
    if (!this.picture ||this.picture.length == 0){
      this.newBook.photo="";
     
    }  else {
      this.newBook.photo = this.picture;
    }
    //call adding a new book
    // console.log("New book: ", this.newBook);
    this.adminService.addBook(this.newBook).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.message = 'Book added';
      } else {
        this.message = 'Error in adding book';
      }
    })
  }

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
