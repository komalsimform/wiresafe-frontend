import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ChannelService } from './service/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  ismessage:boolean = false;
  constructor(private router:Router,private channelService:ChannelService) { }

  ngOnInit() {
  }

  gotoMessage() {
    this.channelService.checkpage(true);
    this.router.navigateByUrl('/message');
  }

 

}
