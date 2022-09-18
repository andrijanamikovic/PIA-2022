import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.current = JSON.parse(localStorage.getItem('currentUser'));
    if (this.current == null) {
      this.router.navigate(['']);
    }
    else if (this.current.type != 2) {
      this.router.navigate(['']);
    }
  }

  current: User;

  addBook(){
    if (this.current.blocked) {
      return;
    }
    this.router.navigate(['/addBook']);
  }

  blocked(user: User){
    if (user.blocked == null) {
      return false;
    }
    return user.blocked;
  }
}
