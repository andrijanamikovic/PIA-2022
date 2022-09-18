import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (current == null) {
      this.router.navigate(['']);
    }
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users);
  })}


  user: User;
  users: User [] = [];


  edit(user: User) {
    localStorage.setItem('User',  JSON.stringify(user));
    this.router.navigate(['userEditing']);
  }

  delete(user: User){
    
    this.userService.delete(user).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.users = [];
        this.ngOnInit();
      } else {
        // this.message = 'not deleted';
      }
    })
  }

  block(user: User){
    
    this.userService.block(user, true).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.users = [];
        this.ngOnInit();
      } else {
        this.message = 'not blocked';
      }
    })
  }

  message:string;

  Unblock(user: User){
    
    this.userService.block(user, false).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.users = [];
        this.ngOnInit();
      } else {
        this.message = 'not unblocked';
      }
    })
  }

  borrowed(user: User){
    return user.taken == 0;
  }

  hasPhoto(user: User){
    if (user.photo=="")
      return false;
    else {
      return true;
    }
  }

  canDelete(user: User){
    return user.taken == 0;
  }


}
