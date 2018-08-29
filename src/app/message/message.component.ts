import { Component, OnInit } from '@angular/core';
import { MessageService } from './service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messageList:any = [];
  loginuserid:string;
  sharedVarParent = 'hii';
  constructor(private messageService:MessageService) { }

  ngOnInit() {
    this.loginuserid = localStorage.getItem('loginuserid');
    console.log('login',this.loginuserid);
    this.getMessages();
    console.log('parent comp',this.sharedVarParent);
  }

  getMessages() {
    let channelid = '21424f6f6466584c6e4a625457684679714e763a6e656f2e77697265736166652e636f6d';
    this.messageService.getAllMessages(channelid) 
      .subscribe(result => {
        console.log('suucess msg',result);
        this.messageList = result;
      });
  }

}
