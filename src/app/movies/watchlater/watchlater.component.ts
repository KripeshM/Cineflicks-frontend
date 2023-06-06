import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlater',
  templateUrl: './watchlater.component.html',
  styleUrls: ['./watchlater.component.css']
})
export class WatchlaterComponent implements OnInit{
  user:string=''
  showuser:string=''
  watchlistMovies:any=[]
  constructor(private api:ApiService,private watchRouter:Router){}
  ngOnInit(): void {

    if(!localStorage.getItem('currentUser')){
      alert("Please Login")
      this.watchRouter.navigateByUrl('/movies')
    }



    this.user=localStorage.getItem('currentUser')||''
    this.showuser=this.user.toUpperCase()
    this.api.getwatchlist(this.user).subscribe((result:any)=>{
      console.log(result);
      this.watchlistMovies=result;
     
      
    },
    (result:any)=>{
      console.log(result.error);
      
    }
    )
  }

  removewatchlist(id:any){
    this.api.removewatchlist(this.user,id).subscribe((result:any)=>{
      this.watchlistMovies=result
    })
  }

  addtofavourite(movie:any){
    this.api.addtofavourite(this.user,movie.id,movie.title,movie.poster).subscribe((result:any)=>{
      this.removewatchlist(movie.id)
      alert(result)
    },
    (result:any)=>{
      alert(result.error)
      this.removewatchlist(movie.id)

    }
    )
  }
  
  logout(){
    localStorage.clear()
    alert("Logged out successfully")
    this.watchRouter.navigateByUrl('/movies')
  }
}
