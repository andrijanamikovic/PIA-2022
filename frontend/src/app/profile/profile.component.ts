import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (current == null) {
      this.router.navigate(['']);
    }
  }

  user: User;

  hasPhoto(user: User){
    if (user.photo=="")
      return false;
    else {
      return true;
    }
  }

}
