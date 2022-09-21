import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { User } from '../model/user';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService, private userService: UserService) { }

  ngOnInit(): void {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    if (this.current == null) {
      this.router.navigate(['']);
    }
    // else if (this.current.type == 0   || this.current.type == 1) {
    //   this.router.navigate(['']);
    // }
  }

  newBook: Book = new Book();
  picture: string;
  message:string;
  current: User;

  submit(){
    if (!this.picture || this.picture.length == 0){
      this.newBook.photo="";
     
    }  else {
      this.newBook.photo = this.picture;
    }
    //call adding a new book
    // console.log("New book: ", this.newBook);
    console.log(this.current.type);
    if (this.current.type != 0){
      this.adminService.addBook(this.newBook).subscribe(resp=>{
        if (resp['message'] == 'ok'){
          this.message = 'Book added';
        } else {
          this.message = 'Error in adding book';
        }
      })
    } else {
      this.userService.addBook(this.newBook, this.current).subscribe(resp=>{
        if (resp['message'] == 'ok'){
          this.message = 'Request for a new book send for review';
        } else {
          this.message = 'Error';
        }
      })
    }
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
