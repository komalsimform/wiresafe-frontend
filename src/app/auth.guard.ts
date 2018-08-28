import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable,BehaviorSubject  } from 'rxjs';
import { LoginService } from './login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public isloggedIn = new BehaviorSubject<boolean>(false);

  constructor(private loginService:LoginService){}
  canActivate(): boolean {
    if(this.loginService.loggedIn()){
      this.isloggedIn.next(true);
      return true;
    }
    else {
      this.isloggedIn.next(false);
      // this.router.navigate(['']);
      return false;
    }
  }
}
