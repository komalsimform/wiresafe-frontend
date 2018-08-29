import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';
import { Login } from './model/login';
import { Router } from '@angular/router';
import { ChannelService } from '../channel/service/channel.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new Login();
  constructor(private loginService:LoginService,private router:Router,private channelservice:ChannelService) { }

  ngOnInit() {
    // this.channelservice.channelList()
    //   .subscribe(data => {
    //     console.log(data);
    //   });
    localStorage.setItem('loginuserid','/user/4075736572313a6e656f2e77697265736166652e636f6d');
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
