import { Component, OnInit } from '@angular/core';
import { MessageService } from './service/message.service';
import { Message } from './model/message';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messageList:any = [];
  loginuserid:string;
  newMessage;
  channelid:any;
  constructor(private messageService:MessageService,private route: ActivatedRoute,private router:Router,private datePipe: DatePipe) { }

  ngOnInit() {
    this.loginuserid = localStorage.getItem('loginuserid');
    this.getMessages();
  }

  getMessages() {
    let list:any = [];
    let url = this.router.url.split('/message');
    this.channelid = url[1];
    this.messageService.messages
      .subscribe(result => {
        if(result === '' || result === null){
          this.messageService.getAllMessages(url[1]) 
              .subscribe(data => {
                list = JSON.parse(data._body).messages;
                list.forEach(res => {
                  res.date_ = this.datePipe.transform(res.timestamp,"MMM dd yyyy");
                  this.messageList.push(res);
                });
              this.messageList = this.message(this.messageList,'date_');
              });
        }
        else {
              this.messageList = result;
        }
      }); 
  }

  message(value,field){
    const groupedObj = value.reduce((prev, cur)=> {
      if(!prev[cur[field]]) {
        prev[cur[field]] = [cur];
      } else {
        prev[cur[field]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => {
        return { key, value: groupedObj[key] }
    });
  }


  sendMessage(msg) {
    this.newMessage = msg;
    // let newjson = {
    //     "@type": "Text",
    //     "channelId": this.channelid,
    //     "timestamp": Date.now(),
    //     "sender": this.loginuserid,
    //     "content": this.newMessage
    // };
    let newjson = {
      "channelId": this.channelid,
      "content": this.newMessage,
      // "sender": this.loginuserid,
    };
     this.messageService.sendMessage(newjson)
      .subscribe(result => {
        this.getMessages();
      });
  }
}
