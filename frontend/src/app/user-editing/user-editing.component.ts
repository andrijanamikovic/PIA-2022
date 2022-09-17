import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-editing',
  templateUrl: './user-editing.component.html',
  styleUrls: ['./user-editing.component.css']
})
export class UserEditingComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    if (this.current == null) {
      this.router.navigate(['']);
    }
    else if (this.current.type == 0) {
      this.router.navigate(['']);
    }
    this.user = JSON.parse(localStorage.getItem('User'));
  }

  picture:string;
  message:string;
  current:User;
  user: User;
  newUser: User = new User();
  

  getNewBook(){
    this.user = JSON.parse(localStorage.getItem('User'));
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

  
  submit() {  
    Object.keys(this.user).forEach(i=>{
      if (this.newUser[i] == undefined) {
        this.newUser[i] = this.user[i];
      }
    })
    if(!this.picture ||this.picture.length == 0){
  
      this.picture = "";
  
    } 

    this.newUser.photo = this.picture;

    //calling saving edits

    this.userService.edit(this.newUser).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.message = 'User edited';
      } else {
        this.message = 'Error in editing user';
      }
    })
  }

}
