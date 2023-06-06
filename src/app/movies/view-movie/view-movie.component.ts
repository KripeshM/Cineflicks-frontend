import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.css']
})
export class ViewMovieComponent implements OnInit{
  constructor(private viewRouter:Router,private api:ApiService,private viewactivatedRoute:ActivatedRoute,private reviewfb:FormBuilder,private datePipe: DatePipe){}
  user:string=''
  showuser:string=''
  movieId:any
  movie:any={}
  review:any
  currentDate:any
  reviewDate:any
  postedReview:any={}
  ngOnInit(): void {

    if(!localStorage.getItem('currentUser')){
      alert("Please Login")
      this.viewRouter.navigateByUrl('/movies')
    }

    this.user=localStorage.getItem('currentUser')||''
    this.showuser=this.user.toUpperCase()

    this.viewactivatedRoute.params.subscribe((data:any)=>{
      console.log(data.id);
      this.movieId=data.id
    })
    this.getmovie()
    this.currentDate=new Date()
    this.reviewDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');

    
  }

  getmovie(){
    this.api.getmovie(this.movieId).subscribe((result:any)=>{
      console.log(result);
      this.movie=result;
      
    })
  }

  reviewForm=this.reviewfb.group({
    review:['',[Validators.required,Validators.pattern('[a-zA-z,.0-9&!" ]*')]]
  })

  

  clearform(){
    this.reviewForm.reset()
  }

  postreview(){
    if(this.reviewForm.valid){
      this.review=this.reviewForm.value.review

      console.log(this.reviewDate);
  
      this.api.postreview(this.user,this.movieId,this.review,this.reviewDate).subscribe((result:any)=>{
        alert(result)
        console.log(result);
        
        this.clearform()
        this.getmovie()
  
      },
      (result:any)=>{
        console.log(result.error);
        alert(result.error);
        this.clearform()
        
      }
      )
    }
    else{
      alert("Invalid data")
    }
    
  }

  getreview(){
    this.api.getreview(this.user,this.movieId).subscribe((result:any)=>{
      console.log(result);
      this.postedReview=result
    })
  }

  deletereview(){
    this.api.deletereview(this.user,this.movieId).subscribe((result)=>{
      alert(result)
      this.getmovie()
    },
    (result:any)=>{
      console.log(result.error);
      
    }
    )
  }

  editreview(){
    if(this.reviewForm.valid){
      this.api.editreview(this.user,this.movieId,this.postedReview.review,this.reviewDate).subscribe((result:any)=>{
        alert(result)
        this.getmovie()
      },
      (result:any)=>{
        alert(result.error)
      }
      )
    }
    else{
      alert("Invalid data")
    }
    
  }



  logout(){
    localStorage.clear()
    alert("Logged out successfully")
    this.viewRouter.navigateByUrl('/movies')
  }
}
