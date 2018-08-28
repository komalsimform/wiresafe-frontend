import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../service/channel.service';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.css']
})
export class ChannelDetailComponent implements OnInit {
  channelList:any = [];
  constructor(private channelService:ChannelService) { }

  ngOnInit() {
    this.getChannelList();
  }

  getChannelList() {
    this.channelService.channelList()
      .subscribe(result => {
        console.log('success channellist',result);
        this.channelList = result;
      }); 
  }

}
