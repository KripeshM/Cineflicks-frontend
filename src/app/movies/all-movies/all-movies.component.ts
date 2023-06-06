import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit{

  allmovies:any=[]
  user:string=''
  searchTerm:String=''
  orgSearchTerm:String=''
  constructor(private api:ApiService,private mainRouter:Router){}
  ngOnInit(): void {
    if(!localStorage.getItem('currentUser')){
      alert("Please Login")
      this.mainRouter.navigateByUrl('/movies')
    }
    this.api.getallmovies().subscribe((result:any)=>{
      console.log(result);
      this.allmovies=result;
      this.user=localStorage.getItem('currentUser')||''
      this.searchTerm=''
    })
    
    // this.searchTerm=this.api.searchTerm
    this.api.searchTerm.subscribe((result:any)=>{
      this.searchTerm=result
      
    })
  }
  

  addtowatchlist(movie:any){
    console.log(movie);
    this.api.addtowatchlist(this.user,movie.id,movie.title,movie.poster).subscribe((result:any)=>{
      alert(result)
      console.log(result);
      
    },
    (result:any)=>{
      alert(result.error)
      console.log(result.error);
      
    }
    )
  }

  addtofavourite(movie:any){
    this.api.addtofavourite(this.user,movie.id,movie.title,movie.poster).subscribe((result:any)=>{
      alert(result)
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }

  

}
