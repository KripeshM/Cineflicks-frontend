import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  baseUrl='https://cineflicks-gkg6.onrender.com'

  register(email:any,username:any,password:any){
    const body={
      email,
      username,
      password
    }
    // return this.http.post('http://localhost:5000/register',body)
    return this.http.post(`${this.baseUrl}/register`,body)
  }

  
  login(username:any,password:any){
    const body={
      username,
      password
    }
    // return this.http.post('http://localhost:5000/login',body)
    return this.http.post(`${this.baseUrl}/login`,body)

  }
}
