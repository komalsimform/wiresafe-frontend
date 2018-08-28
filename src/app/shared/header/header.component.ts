import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../auth.guard';
import { ChannelService } from '../../channel/service/channel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checkloggedIn:boolean;
  messageheader:boolean;
  constructor(private authgaurd:AuthGuard,private channelService:ChannelService,private router:Router) { }

  ngOnInit() {
    this.authgaurd.isloggedIn.subscribe(result => {
      this.checkloggedIn = result;
      console.log('token res',this.checkloggedIn);
    });

    this.channelService.ischeckpage.subscribe(result => {
      this.messageheader = result;
      console.log('messge header',result);
    });
  }

  backtoChannel() {
    this.messageheader = false;
    this.router.navigateByUrl('/channel');
  }

}
