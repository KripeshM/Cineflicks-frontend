import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  searchTerm=new BehaviorSubject('')

  baseUrl='https://cineflicks-gkg6.onrender.com'



  getallmovies(){
    return this.http.get(`${this.baseUrl}/movies/all-movies`)
  }

  appendToken() {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
  
    if (token) {
      headers = headers.append('verify-token', token);
    }
  
    const options = { headers: headers };
    return options;
  }

  addtowatchlist(username:any,id:any,title:any,poster:any){
    const body={
      username,
      id,
      title,
      poster
    }
    return this.http.post(`${this.baseUrl}/watchlist/add-to-watchlist`,body,this.appendToken())
  }

  getwatchlist(username:any){
   
    return this.http.get(`${this.baseUrl}/watchlist/get-watchlist/${username}`,this.appendToken())
  }

  removewatchlist(username:any,id:any){
    return this.http.delete(`${this.baseUrl}/watchlist/remove-watchlist/${username}/${id}`,this.appendToken())
  }

  addtofavourite(username:any,id:any,title:any,poster:any){
    const body={
      username,
      id,
      title,
      poster
    }
    return this.http.post(`${this.baseUrl}/favourite/add-to-favourite`,body,this.appendToken())
  }

  getfavourite(username:any){
    return this.http.get(`${this.baseUrl}/favourite/get-favourite/${username}`,this.appendToken())
  }

  removefavourite(username:any,id:any){
    return this.http.delete(`${this.baseUrl}/favourite/remove-favourite/${username}/${id}`,this.appendToken())
  }

  getmovie(id:any){
    return this.http.get(`${this.baseUrl}/movies/get-movie/${id}`,this.appendToken())
  }

  postreview(username:any,id:any,review:any,date:any){
    const body={
      username,
      id,
      review,
      date
    }
    return this.http.post(`${this.baseUrl}/review/post-review`,body,this.appendToken())

  }

  deletereview(username:any,id:any){
    return this.http.delete(`${this.baseUrl}/review/delete-review/${username}/${id}`,this.appendToken())
  }

  editreview(username:any,id:any,review:any,date:any){
    const body={
      username,
      id,
      review,
      date
    }
    return this.http.put(`${this.baseUrl}/review/edit-review`,body,this.appendToken())
  }

  getreview(username:any,id:any){
    return this.http.get(`${this.baseUrl}/review/get-review/${username}/${id}`,this.appendToken())
  }
}
