import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
constructor(private logoutRouter:Router,private api:ApiService){}
  user:string=''
  showuser:string=''
  ngOnInit(): void {
    this.user=localStorage.getItem('currentUser')||''
    this.showuser=this.user.toUpperCase()
  }

  logout(){
    localStorage.clear()
    alert("Logged out successfully")
    this.logoutRouter.navigateByUrl('/movies')
  }

  search(event:any){
    console.log(event.target.value);
    this.api.searchTerm.next(event.target.value)
  }
}
