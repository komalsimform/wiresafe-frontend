import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';
import { Login } from './model/login';
import { Router } from '@angular/router';
import { ChannelService } from '../channel/service/channel.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new Login();
  constructor(private loginService:LoginService,private router:Router,private channelservice:ChannelService,private toaster:ToasterService) { }

  ngOnInit() {
  }

  getUserDetail() {
    if(this.login.username === undefined) {
      this.toaster.pop('error', 'Please enter Username and Password');
    }
    else {
      if(this.login.username === 'user-1' || this.login.username === 'User-1') {
        this.login.id = '4075736572313a6e656f2e77697265736166652e636f6d';
        localStorage.setItem('loginuserid','/user/4075736572313a6e656f2e77697265736166652e636f6d');
      }
      else {
        //user-2
        this.login.id = '4075736572323a6e656f2e77697265736166652e636f6d';
        localStorage.setItem('loginuserid','/user/4075736572323a6e656f2e77697265736166652e636f6d');
      }
      this.loginService.getUserDetail(this.login.id)
        .subscribe(result => {
          localStorage.setItem('token','123456789');
          this.router.navigateByUrl('/channel');
        });
    } 
  }

}
