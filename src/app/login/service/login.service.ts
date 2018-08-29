import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { ApiService} from '../../shared/services/apiservice.service';
import {Http, Headers} from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService:ApiService,private http:Http) { }

  
  //Get user data
  getUserDetail(userid): Observable<Login> {
    return this.apiService.get('/user/'+ userid);
  }

  //set token into local storage
  sendToken(token: string) {
   return localStorage.setItem("token", token)
  }

  //get token from local storage
  loggedIn() {
    return !!localStorage.getItem('token'); //it will return either true or false value
  }
  

}
