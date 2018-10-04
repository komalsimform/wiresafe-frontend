import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessageService } from './service/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit  {
  messageList:any = [];
  loginuserid:string;
  channelid:any;
  constructor(private messageService:MessageService,private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.params.subscribe(result => {
      this.channelid = result['id'];
    });
    

    this.loginuserid = localStorage.getItem('loginuserid');
    this.getMessages();
    Observable.interval(2000)
    .subscribe((val) => { this.syncMessagewithToken() });
  }

  getMessages() {
    let list:any = [];
    this.messageService.messages
      .subscribe(result => {
        if(result === '' || result === null){
          this.messageService.getAllMessages(this.channelid) 
              .subscribe(data => {
                this.messageList = JSON.parse(data._body).messages;
              });
        }
        else {
              this.messageList = result;
        }
      }); 
  }

  syncMessages() {
    this.messageService.syncMessages()
      .subscribe(data => {
        let result = JSON.parse(data['_body']).messages;
        this.messageList = result.filter(x => x.channelId === '/channel/'+this.channelid);
        localStorage.setItem('syncMessageToken',JSON.parse(data['_body']).nextToken);
      });
  }

  syncMessagewithToken() {
    this.syncMessages();
    let token = localStorage.getItem('syncMessageToken');
    this.messageService.syncMessageswithToken(token)
      .subscribe(data => {
        localStorage.setItem('syncMessageToken',JSON.parse(data['_body']).nextToken);
        this.messageList.push(JSON.parse(data['_body']).messages[0]);
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
    let newmsg = null;
    let type = 'Text';
    let filename:any = [];
    let newjson;
    let mediaid = [];
    
    if(msg.files.length > 0) {
      type = 'Attachment';
      
      for (var i = 0; i < msg.files.length; i++) {
        filename = msg.files[i].name;
        this.messageService.sendAttachment(msg.files[i])
        .subscribe(data => {
          let res = JSON.parse(data['_body']);
           mediaid.push(res.id);
        })
      }
      if(msg.message !== undefined) {
        newmsg = msg.message;
      }
      newjson = {
        "content": newmsg,
        "mediaId": mediaid,
        "filename": filename,
        "@type": type
      };
    }
    else {
      if(msg.message !== undefined) {
        newmsg = msg.message;
      }
      newjson = {
        "content": newmsg,
        "@type": type
      };
    }
    setTimeout(()=>{
     this.messageService.sendMessage(newjson,this.channelid)
      .subscribe(result => {
        this.syncMessagewithToken();
      });
    },3000);
  }
}
