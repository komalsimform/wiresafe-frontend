import { Component, OnInit } from '@angular/core';
import { MessageService } from './service/message.service';
import { Message } from './model/message';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messageList:any = [];
  loginuserid:string;
  newMessage;
  constructor(private messageService:MessageService) { }

  ngOnInit() {
    this.loginuserid = localStorage.getItem('loginuserid');
    this.getMessages();
  }

  getMessages() {
    let channelid = '21424f6f6466584c6e4a625457684679714e763a6e656f2e77697265736166652e636f6d';
    this.messageService.messages
      .subscribe(result => {
        if(result === '' || result === null){
          this.messageService.getAllMessages(channelid) 
              .subscribe(data => {
                this.messageList = data;
              });
        }
        else {
              this.messageList = result;
        }
      }); 
  }


  sendMessage(msg) {
    this.newMessage = msg;
    let newjson = {
        "@id": "/channel/21424f6f6466584c6e4a625457684679714e763a6e656f2e77697265736166652e636f6d/messages/24313533343230363433323539727a745a793a6e656f2e77697265736166652e636f6d",
        "@type": "Text",
        "channelId": "/channel/21424f6f6466584c6e4a625457684679714e763a6e656f2e77697265736166652e636f6d",
        "timestamp": 1535624913000,
        "sender": "/user/4075736572313a6e656f2e77697265736166652e636f6d",
        "content": this.newMessage
    };
    //  this.messageService.sendMessage(newjson);
      // .subscribe(result => {
      //   console.log('success send msg',result);
      // });

    let channelid = '21424f6f6466584c6e4a625457684679714e763a6e656f2e77697265736166652e636f6d';
    this.messageService.getAllMessages(channelid)
      .subscribe(result => {
        result.push(newjson);
        this.newMessage = '';
        this.messageService.msgdata(result);
      });
  }
}
