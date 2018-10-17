import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ChannelService } from './service/channel.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  ismessage:boolean = false;
  channelList:any = [];
  constructor(private router:Router,private channelService:ChannelService,private toaster:ToasterService) { }

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
 

}
