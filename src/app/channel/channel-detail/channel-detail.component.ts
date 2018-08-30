import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../service/channel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.css']
})
export class ChannelDetailComponent implements OnInit {
  channelList:any = [];
  constructor(private channelService:ChannelService,private router:Router) { }

  ngOnInit() {
    this.getChannelList();
  }

  getChannelList() {
    this.channelService.channelList()
      .subscribe(result => {
        this.channelList = result;
      }); 
  }
  gotoMessage() {
    this.channelService.checkpage(true);
    this.router.navigateByUrl('/message');
  }


}
