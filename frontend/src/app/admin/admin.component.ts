import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Router } from '@angular/router';
import { User } from '../model/user';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService,  private router: Router) { }

  ngOnInit(): void {
    this.adminService.getAllPadding().subscribe((data: User[])=>{
      this.allRequests = data;
    } )



    
    let current = JSON.parse(localStorage.getItem('currentUser'));
    if (current == null) {
      this.router.navigate(['']);
    }
    else if (current.type != 1) {
      this.router.navigate(['']);
    }
  }

  allRequests: User[] = [];

  //aprove prebacuje iz jedne baze u drugu i refresuje posle ovo

  approve(username){
    this.adminService.approve(username).subscribe((resp)=>{
      alert(resp['message'])
      this.ngOnInit(); //za refresh
    })

  }


  //decline brise iz review baze i refresuje posle ovo
  
  
  decline(username){
    this.adminService.decline(username).subscribe((resp)=>{
      alert(resp['message'])
      this.ngOnInit(); //za refresh
    })
  }


  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirmation: string;
  address: string;
  phone: string;
  email: string;
  photo: string;
  type: number;

  message: string;

  addUser(){
    if (!this.firstname || !this.lastname || !this.username || !this.password || !this.confirmation || !this.address ||
      !this.phone || !this.email) {
      this.message = "Some filed is missing required data!"; //mogu sa alert da radim ovo? oni nisu u julu
      return;
    } 

    if (this.firstname.length==0 || this.lastname.length==0 || this.username.length==0 || this.password.length==0
       || this.confirmation.length==0 || this.address.length==0 || this.email.length==0) {
      this.message = "Some filed is missing required data!";
      return;
    }

    if (this.password != this.confirmation){
      this.message = "Passwords aren't matching";
      return;
    }

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;
    if (!pattern.test(this.password)){
      this.message = "Passwords needs to contain:\nBetween 8 and 24 letters \nOne upper-case letter \nOne lower-case letter \nOne number \nOne special sing ";
      return;
    }

    const pattern1 = /\\b([a-zA-Z0-9])\\1\\1+\\b/;

    if (pattern1.test(this.password)){
      this.message = "It can't contain more then three "
      return;
    }

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!emailPattern.test(this.email)){
      this.message = "Wrong email format";
    }

    this.adminService.addUser(this.firstname, this.lastname, this.username, this.password, this.address, this.phone, this.email, this.photo, this.type).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.message = 'User added';
      } else if (resp['message'] == 'username') {
        this.message = 'Error in adding user, username already exists';
      } else if (resp['message'] == 'email'){
        this.message = 'Error in adding user, email already in use with a different account';
      } else {
        this.message = 'Unknown error';
      }
    })


  }

  message2: string;

  days:number = parseInt(localStorage.getItem('days'));
  extend:number = 0;
  changeDays() {
    //set days u bazi
    console.log("Dani su bez broja");
    console.log(this.days);
    this.adminService.changeDays(this.days).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.message2 = 'Changed';
      } else {
        this.message2 = 'Error';
      }
    })
  }

  extendDays(){
    this.adminService.extend(this.extend).subscribe(resp=>{
      if (resp['message'] == 'ok'){
        this.message2 = 'Changed';
      } else {
        this.message2 = 'Error';
      }
    })
  }

  editUser(){
    this.router.navigate(['/adminEditUsers']);
  }

  editBook(){
    this.router.navigate(['/adminEditBooks']);
  }

  addBook(){
    this.router.navigate(['/addBook']);
  }

  hasPhoto(user: User){
    if (user.photo=="")
      return false;
    else {
      return true;
    }
  }
}
