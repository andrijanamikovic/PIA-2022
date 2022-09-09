import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { User } from '../model/user';
import { MainService } from '../services/main.service';
import { TakeService } from '../services/take.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  constructor(private mainService: MainService, private router: Router, private takeService: TakeService) { }

  ngOnInit(): void {
   this.current = JSON.parse(localStorage.getItem('currentUser'));
    if (this.current == null) {
      this.router.navigate(['']);
    }
    this.mainService.getTop().subscribe((data: Book[])=>{
      data.find(element => {
        if (element.title == localStorage.getItem('ClickedBook')) {
          this.clicked = element;
          return;
        }
      })

    })

  }

  clicked: Book;
  current: User;
  message:String;

  borrow(){
    //ovde treba da povecam broj uzetih i negde da napravim da sam ja uzela knjigu u novoj tabeli kako 
    //koji moj kurac to da uradim zivote
    if (localStorage.getItem('flag')=='false'){
      this.message = "Have books whit expired deadline, need to give them back first in order to get a new one";
    } else {
    this.takeService.take(this.clicked,this.current).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.message = 'ok';
        //moram da bacim update za broj uzetih knjiga
        
      } else if (resp['message'] == '3 taken') {
        this.message = 'exited limit';
      } if (resp['message'] == 'already taken') {
        this.message = 'already taken and not returned';
      }else {
        this.message = 'error';
      }
    });
  }
  }

}
