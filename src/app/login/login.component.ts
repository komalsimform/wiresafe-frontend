import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';
import { Login } from './model/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new Login();
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit() {
  }

  getUserDetail(id) {
    // this.loginService.sendToken('12345');
    localStorage.setItem('token','123456789');
    this.router.navigateByUrl('/channel');
    // this.login.id = id;
    // this.loginService.getUserDetail(this.login.id)
    //   .subscribe(result => {
    //     console.log('success user',result);
    //   });
  }

}
