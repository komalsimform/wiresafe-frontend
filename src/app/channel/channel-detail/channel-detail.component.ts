import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../service/channel.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.css']
})
export class ChannelDetailComponent implements OnInit {
  channelList:any = [];
  constructor(private channelService:ChannelService,private router:Router,private toaster:ToasterService) { }

  ngOnInit() {
    this.getChannelList();
  }

  getChannelList() {
    this.channelService.channelList()
      .subscribe(result => {
        if(result.status === 200) {
          this.channelList = JSON.parse(result._body);
         }
         else {
           this.toaster.pop('error', result.statusText);
         }
      }); 
  }
  gotoMessage(channel) {
    this.channelService.checkpage(true);
    this.router.navigateByUrl(channel['@id']+'/message');
  }


}
