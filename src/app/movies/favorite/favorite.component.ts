import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit{
  user:string=''
  showuser:string=''
  favouriteMovie:any=[];

  constructor(private api:ApiService,private favRouter:Router){}
  ngOnInit(): void {

    if(!localStorage.getItem('currentUser')){
      alert("Please Login")
      this.favRouter.navigateByUrl('/movies')
    }


    this.user=localStorage.getItem('currentUser')||''
    this.showuser=this.user.toUpperCase()

    this.api.getfavourite(this.user).subscribe((result:any)=>{
      this.favouriteMovie=result
    },
    (result:any)=>{
      console.log(result.error);
      
    })
  }

  removefavourite(id:any){
    this.api.removefavourite(this.user,id).subscribe((result:any)=>{
      this.favouriteMovie=result
    })
  }
  

  logout(){
    localStorage.clear()
    alert("Logged out successfully")
    this.favRouter.navigateByUrl('/movies')
  }
}
