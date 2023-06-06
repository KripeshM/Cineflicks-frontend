import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private regFb: FormBuilder, private api: ApiService, private regRouter: Router) { }

  errorMsg:string=''

  ngOnInit(): void {
  }

  registerForm = this.regFb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.pattern('[a-zA-z]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })


  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm);

      let email = this.registerForm.value.email
      let uname = this.registerForm.value.username
      let password = this.registerForm.value.password
      console.log(email, uname, password);

      this.api.register(email, uname, password).subscribe((result: any) => {
        console.log(result);
        alert(result)
        this.regRouter.navigateByUrl('/login')
      },
        (result: any) => {
          this.errorMsg=result.error;
          // alert(result.error)
          
        })
        setTimeout(() => {
          this.errorMsg=''
          this.registerForm.reset();
        }, 2000);
    }
    else {
      alert('Invalid Form')
    }
  }
}
