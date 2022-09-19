import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (current == null) {
      this.router.navigate(['']);
    }
    this.update = false;
    this.newUser = this.user;
  }

  user: User;
  newUser:User;
  update:boolean;

  updateProfile() {
    this.update = !this.update;
  }

  hasPhoto(user: User){
    if (user.photo=="")
      return false;
    else {
      return true;
    }
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

  message:string;

  
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

    // console.log("user in edit: ", this.newUser);
    //calling saving edits

    this.userService.edit(this.newUser).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.message = 'User edited';
      } else {
        this.message = 'Error in editing user';
      }
    })
    this.update = false;
  }

  blocked(user: User){
    if (user.blocked == null) {
      return false;
    }
    return user.blocked;
  }


}
