import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

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
  phone: number;
  email: string;
  photo: string;
  type: number;

  message: string;

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

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;
    if (!pattern.test(this.password)){
      this.message = "Passwords needs to contain:\nBetween 8 and 24 letters \nOne upper-case letter \nOne lower-case letter \nOne number \nOne special sing ";
      return;
    }

    const pattern1 = /(.)1\1\1/;

    if (!pattern1.test(this.password)){
      this.message = "It can't contain more then three "
      return;
    }

    const emailPattern =  /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;

    if (!emailPattern.test(this.email)){
      this.message = "Wrong email format";
    }

    //is username and email uniq? 
    this.userService.register(this.firstname, this.lastname, this.username, this.password, this.address, this.phone, this.email, this.photo, this.type).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.message = 'User added';
      } else if (resp['message'] == 'username') {
        this.message = 'Error in adding user, username already exists';
      } else if (resp['message'] == 'email'){
        this.message = 'Error in adding user, email already in use with a different account';
      } else {
        this.message = 'user added';
      }
      // do i need to add some router navigation
    })


  }

}
