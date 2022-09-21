import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { reviewBook } from '../model/reviewBook';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-book-requests',
  templateUrl: './book-requests.component.html',
  styleUrls: ['./book-requests.component.css']
})
export class BookRequestsComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (current == null) {
      this.router.navigate(['']);
    }
    else if (current.type != 2) {
      this.router.navigate(['']);
    }
    
    this.userService.getAllPadding().subscribe((data: reviewBook[])=>{
      this.allRequests = data;
      console.log(this.allRequests);
    } )



    
   
  }

  allRequests: reviewBook[] = [];

  //aprove prebacuje iz jedne baze u drugu i refresuje posle ovo

  approve(_id){
    this.userService.approve(_id).subscribe((resp)=>{
      alert(resp['message'])
      this.ngOnInit(); //za refresh
    })

  }


  //decline brise iz review baze i refresuje posle ovo
  
  
  decline(_id){
    this.userService.decline(_id).subscribe((resp)=>{
      alert(resp['message'])
      this.ngOnInit(); //za refresh
    })
  }

  hasPhoto(user: reviewBook){
    if (user.photo=="")
      return false;
    else {
      return true;
    }
  }

}
