import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { User } from '../model/user';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllPadding().subscribe((data: User[])=>{
      this.allRequests = data;
    } )
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
}
