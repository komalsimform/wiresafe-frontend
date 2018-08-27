import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { ApiService} from '../../shared/services/apiservice.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService:ApiService) { }

  
  //Get user data
  getUserDetail(userid): Observable<Login> {
    return this.apiService.get('/user/'+ userid);
  }


}
