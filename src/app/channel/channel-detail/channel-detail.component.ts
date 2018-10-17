import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../service/channel.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.css']
})
export class ChannelDetailComponent implements OnInit {
  @Input() channelList:any;
  constructor(private channelService:ChannelService,private router:Router,private toaster:ToasterService) { }

  ngOnInit() {
  }

  
  gotoMessage(channel) {
    let channelDetail = {
      checkPage: true,
      channel:channel
    }
    this.channelService.checkpage(channelDetail);
    this.router.navigateByUrl(channel['@id']+'/message');
  }


}
