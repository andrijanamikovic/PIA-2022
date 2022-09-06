import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { 
  }

  ngOnInit(): void {
  }
  
  username: string;
  password: string;
  message: string;
    
  currentUser: User;
  login(){
    this.userService.loginAdmin(this.username,this.password).subscribe((userFromDB: User)=>{
      if (userFromDB!=null){
        if (userFromDB.type == 1){
        localStorage.setItem('type', userFromDB.type.toString());
        localStorage.setItem('currentUser', JSON.stringify(userFromDB));
        this.router.navigate(['admin']);
      } else {
          this.message =  "Use another link!"
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
