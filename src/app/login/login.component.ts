import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private logFb:FormBuilder,private api:ApiService,private logRouter:Router){}

  loginErrMsg:string=''

  ngOnInit(): void {
  }

  loginForm=this.logFb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-z]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm);
      let uname = this.loginForm.value.username
      let password = this.loginForm.value.password

      this.api.login(uname,password).subscribe((result:any)=>{

         // console.log(result);
        // console.log(result.user.username);

        localStorage.setItem('currentUser',result.user.username)
        localStorage.setItem('token',result.token)
       
        alert("Successfully logged in")
        this.logRouter.navigateByUrl('/movies/allmovies')
      },
     (result:any)=>{
      // alert(result.error)
      this.loginErrMsg=result.error

      setTimeout(() => {
        this.loginForm.reset()
        this.loginErrMsg=''
      },2000);
     } 
      )
    }
    else {
      alert('Invalid Form')
    }
  }
}
