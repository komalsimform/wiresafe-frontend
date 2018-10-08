import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../auth.guard';
import { ChannelService } from '../../channel/service/channel.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../message/service/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checkloggedIn:boolean;
  messageheader:boolean;
  attachmentheader:boolean;
  channelid:string;
  channelName:string;
  constructor(private authgaurd:AuthGuard,private channelService:ChannelService,private router:Router,private route: ActivatedRoute,private messageService:MessageService) { 
   
   }

  ngOnInit() {
    this.authgaurd.isloggedIn.subscribe(result => {
      this.checkloggedIn = result;
    });

    this.channelService.ischeckpage.subscribe(result => {
      this.messageheader = result;
    });

    this.messageService.channelid
      .subscribe(result => {
        this.channelid = result;
        if(this.channelid !== null || this.channelid !== '') {
           this.getChannelDetail();
        }
      });
  }

  backtoPage() {
          if(this.router.url === '/attachmentlist') {
            this.messageheader = true;
            this.attachmentheader = false;
            this.router.navigateByUrl('/message');
          }
          else {
            this.messageheader = false;
            this.attachmentheader = false;
            this.router.navigateByUrl('/channel');
          }
  }

  attachment() {
    this.attachmentheader = true;
    this.router.navigateByUrl('/channel/'+ this.channelid + '/attachmentlist');
  }

  getChannelDetail() {
    this.channelService.channelDetail(this.channelid)
      .subscribe(result => {
        let data = JSON.parse(result['_body']);
        this.channelName = data.name;
      });
  }

}
