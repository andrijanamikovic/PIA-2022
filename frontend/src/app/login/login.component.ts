import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

  
export class LoginComponent implements OnInit {
  static getUser(): any {
    throw new Error('Method not implemented.');
  }

  constructor(private userService: UserService, private router: Router) { 
  }

  ngOnInit(): void {
  }
  
  username: string;
  password: string;
  message: string;
    
  currentUser: User;
  login(){
    this.userService.login(this.username,this.password).subscribe((userFromDB: User)=>{
      if (userFromDB!=null){
        localStorage.setItem('type', userFromDB.type.toString());
        localStorage.setItem('currentUser', JSON.stringify(userFromDB));
        if (userFromDB.type ==0){
          this.router.navigate(['reader']);
        } else if (userFromDB.type == 1) {
          this.router.navigate(['admin']);
        } else if (userFromDB.type==2){
          this.router.navigate(['moderator']);
        }
      } else {
        this.message =  "error"
      }
    })
  }

  getUser(){
    return this.currentUser;
  }

}



