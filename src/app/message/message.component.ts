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
  constructor(private messageService:MessageService,private route: ActivatedRoute,private router:Router,private datePipe: DatePipe) { }

  ngOnInit() {
    
  //   this.route.params.subscribe(params => {
  //    console.log('params',params);
  // });
    this.loginuserid = localStorage.getItem('loginuserid');
    this.getMessages();
  }

  getMessages() {
    let list:any = [];
    let url = this.router.url.split('/message');
    console.log('router..',url[1]);
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
              console.log('msg list',this.messageList);
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
    console.log('new msg',msg);
    this.newMessage = msg;
    let newjson = {
        "@id": "/channel/21424f6f6466584c6e4a625457684679714e763a6e656f2e77697265736166652e636f6d/messages/24313533343230363433323539727a745a793a6e656f2e77697265736166652e636f6d",
        "@type": "Text",
        "channelId": "/channel/21424f6f6466584c6e4a625457684679714e763a6e656f2e77697265736166652e636f6d",
        "timestamp": Date.now(),
        "sender": "/user/4075736572313a6e656f2e77697265736166652e636f6d",
        "content": this.newMessage
    };
     this.messageService.sendMessage(newjson)
      .subscribe(result => {
        console.log('success send msg',result);
        this.getMessages();
      });

    // let channelid = '21424f6f6466584c6e4a625457684679714e763a6e656f2e77697265736166652e636f6d';
    // this.messageService.getAllMessages(channelid)
    //   .subscribe(result => {
    //     result.push(newjson);
    //     this.newMessage = '';
    //     this.messageService.msgdata(result);
    //   });
  }
}
