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
    //da me tipa baci na profil gde moze sve ono da edituje admin
  }

  delete(user: User){
    
    this.userService.delete(user).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.ngOnInit();
      } else {
        
      }
    })
  }

  borrowed(user: User){
    return user.taken == 0;
  }

}
