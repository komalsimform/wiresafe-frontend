import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../auth.guard';
import { ChannelService } from '../../channel/service/channel.service';
import { Router } from '@angular/router';
import { MessageService } from '../../message/service/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checkLoggedIn:boolean;
  messageHeader:boolean;
  attachmentHeader:boolean;
  channelId:string;
  channelName:string;
  constructor(private authgaurd:AuthGuard,private channelService:ChannelService,private router:Router,private messageService:MessageService) { 
    this.channelService.setPageHeaders.subscribe(result => {
      this.messageHeader = result.checkPage;
      if(result.channel !== undefined)
        this.channelName = result.channel.name;
    });
   }

  ngOnInit() {
    this.authgaurd.isloggedIn.subscribe(result => {
      this.checkLoggedIn = result;
    });
    this.messageService.channelid
      .subscribe(id => {
        this.channelId = id;
      });
  }

  backtoPage() {
          if(this.router.url === '/channel/'+ this.channelId + '/attachmentlist') {
            this.messageHeader = true;
            this.attachmentHeader = false;
            this.router.navigateByUrl('/channel/'+ this.channelId +'/message');
          }
          else {
            this.messageHeader = false;
            this.attachmentHeader = false;
            this.router.navigateByUrl('/channel');
          }
  }

  attachment() {
    this.attachmentHeader = true;
    this.router.navigateByUrl('/channel/'+ this.channelId + '/attachmentlist');
  }

  logOut() {
    localStorage.removeItem('APIKey');
    localStorage.removeItem('loginuserid');
    localStorage.removeItem('token');
    localStorage.removeItem('syncMessageToken');
    this.checkLoggedIn = false;
    this.messageHeader = false;
    this.attachmentHeader = false;

    this.router.navigateByUrl('/login');
  }

}
