import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../auth.guard';
import { ChannelService } from '../../channel/service/channel.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checkloggedIn:boolean;
  messageheader:boolean;
  attachmentheader:boolean;
  constructor(private authgaurd:AuthGuard,private channelService:ChannelService,private router:Router) { 
   }

  ngOnInit() {
    this.authgaurd.isloggedIn.subscribe(result => {
      this.checkloggedIn = result;
    });

    this.channelService.ischeckpage.subscribe(result => {
      this.messageheader = result;
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
    this.router.navigateByUrl('/attachmentlist');
  }

}
