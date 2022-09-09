import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Taken } from '../model/taken';
import { MainService } from '../services/main.service';
import { TakeService } from '../services/take.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private router: Router, private mainService: MainService, private takeService: TakeService) { }

  ngOnInit(): void {
    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (current == null) {
      this.router.navigate(['']);
    }
    if (current != null) {
      this.takeService.getReturned(current).subscribe((data: Taken[]) => {
        console.log("returned data: ");
        console.log(data);
  })
  }
}

}
