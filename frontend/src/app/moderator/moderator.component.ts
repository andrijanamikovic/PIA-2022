import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (current == null) {
      this.router.navigate(['']);
    }
    else if (current.type != 2) {
      this.router.navigate(['']);
    }
  }

  addBook(){
    this.router.navigate(['/addBook']);
  }

}
