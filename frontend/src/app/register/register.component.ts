import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirmation: string;
  address: string;
  phone: string;
  email: string;
  photo: string;
  type: number;

  message: string;

  file: File;
  picture:string;

  register() {

    this.type = 2; //registration only for readers

    if (!this.firstname || !this.lastname || !this.username || !this.password || !this.confirmation || !this.address ||
      !this.phone || !this.email) {
      this.message = "Some filed is missing required data!"; //mogu sa alert da radim ovo? oni nisu u julu
      return;
    }

    if (this.firstname.length==0 || this.lastname.length==0 || this.username.length==0 || this.password.length==0
       || this.confirmation.length==0 || this.address.length==0 || this.email.length==0) {
      this.message = "Some filed is missing required data!";
      return;
    }

    if (this.password != this.confirmation){
      this.message = "Passwords aren't matching";
      return;
    }

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;
    if (!pattern.test(this.password)){
      this.message = "Passwords needs to contain:\nBetween 8 and 24 letters \nOne upper-case letter \nOne lower-case letter \nOne number \nOne special sing ";
      return;
    }

    const pattern1 = /\\b([a-zA-Z0-9])\\1\\1+\\b/;

    if (pattern1.test(this.password)){
      this.message = "It can't contain more then three "
      return;
    }

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!emailPattern.test(this.email)){
      this.message = "Wrong email format";
    }

    // this.photo = this.photo.replace("data:", "").replace(/^.+,/, "");

    if(!this.picture ||this.picture.length == 0){
  
      this.picture = ""
  
    }
    
    this.userService.register(this.firstname, this.lastname, this.username, this.password, this.address, this.phone, this.email, this.picture, this.type).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.message = 'User send for review';
      } else if (resp['message'] == 'username') {
        this.message = 'Error in adding user, username already exists';
      } else if (resp['message'] == 'email'){
        this.message = 'Error in adding user, email already in use with a different account';
      } else {
        this.message = 'Unknown error';
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

