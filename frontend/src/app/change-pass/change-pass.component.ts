import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (current == null) {
      this.router.navigate(['']);
    }
  }

  
  oldPassword: string;
  newPassword:string;
  confirmPassword:string;
  message: string;

  
  changePassword(){
    console.log('Change password: ');
    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword){
      this.message = "Some filed is missing required data!"; 
      return;
    }

    if (this.oldPassword != current.password) {
      this.message = "Wrong old password";
      return;
    }
    
    if (this.newPassword != this.confirmPassword){
      this.message = "Passwords aren't matching";
      return;
    }

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;
    if (!pattern.test(this.newPassword)){
      this.message = "Passwords needs to contain:\nBetween 8 and 24 letters \nOne upper-case letter \nOne lower-case letter \nOne number \nOne special sing ";
      return;
    }

    const pattern1 = /\\b([a-zA-Z0-9])\\1\\1+\\b/;

    if (pattern1.test(this.newPassword)){
      this.message = "It can't contain more then three "
      return;
    }

    console.log(current.password);
    this.userService.changePassword(current,this.newPassword).subscribe((resp)=>{
       if (resp['message'] == 'updated'){
        this.message = 'Password updated!';
        document.getElementById("myForm").style.display = "none";
        localStorage.clear();
        this.router.navigate(['']);
      } else {
        this.message = 'Unknown error';
      }
    })
  }
}
