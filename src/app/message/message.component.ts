import { Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { MessageService } from './service/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable,Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import { ToasterService } from 'angular2-toaster';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit,OnDestroy  {
  messageList:any = [];
  loginuserid:string;
  channelId:any;
  lastScrollTop: number = 0;
  direction: string = "";
  isSyncMethod:boolean = true;
  currentMessageSubscription: Subscription

  constructor(private messageService:MessageService,private route: ActivatedRoute,private toaster:ToasterService) {
    window.onscroll = () => {
      let scroll = window.pageYOffset;
      if (scroll > this.lastScrollTop) {

      } else {
        this.direction = "up";
            let prev = localStorage.getItem('previousMessageToken');
            localStorage.removeItem('previousMessageToken');
            this.messageService.getAllMessageswithPrevToken(this.channelId,prev)
              .subscribe(result => {
                localStorage.setItem('previousMessageToken',JSON.parse(result._body).token.previous);
                this.messageList = this.messageList.reverse();
                  JSON.parse(result._body).messages.forEach((res,index) => {
                    this.messageList.push(res);
                  });
                this.messageList = this.messageList.reverse();
              },err => {
                this.toaster.pop('error', JSON.parse(err._body).error);
              });
          }
      }
    };

  
  ngOnInit() {
    this.loginuserid = localStorage.getItem('loginuserid');

    this.route.params.subscribe(result => {
      this.channelId = result['id'];
      this.messageService.setChannelid(this.channelId);
    },err => {
      this.toaster.pop('error', JSON.parse(err._body).error);
    });
    
    this.currentMessageSubscription =  Observable.interval(2000)
      .subscribe((val) => { this.syncMessages() });
      this.getMessages();
  }

  ngOnDestroy() {
    this.currentMessageSubscription.unsubscribe();
  }

  getMessages() {
       this.messageService.getAllMessages(this.channelId) 
          .subscribe(data => {
            localStorage.setItem('previousMessageToken',JSON.parse(data._body).token.previous);
            this.messageList = (JSON.parse(data._body).messages);
         },err => {
          this.toaster.pop('error', JSON.parse(err._body).error);
        });
  }

  syncMessages() {
    let token = null;
    token = localStorage.getItem('syncMessageToken');
    localStorage.removeItem('syncMessageToken');
    if(this.isSyncMethod) {
      this.messageService.syncMessages(token)
      .subscribe(data => {
        let result = JSON.parse(data['_body']).messages;
        this.messageList = result.filter(x => x.channelId === '/channel/'+this.channelId);

        localStorage.setItem('syncMessageToken',JSON.parse(data['_body']).nextToken);
      },err => {
        this.toaster.pop('error', JSON.parse(err._body).error);
      });
      this.isSyncMethod = false;
    }
    if(token !== null) {
      this.messageService.syncMessages(token)
        .subscribe(data => {
          localStorage.setItem('syncMessageToken',JSON.parse(data['_body']).nextToken);
          if(JSON.parse(data['_body']).messages.length > 0) {
            this.messageList.push(JSON.parse(data['_body']).messages[0]);
          }
        },err => {
          this.toaster.pop('error', JSON.parse(err._body).error);
        });
    }
  }

  setMessageDetail(msg) {
    let type = 'Text';
    let messages;
    if(msg.file) {
      type = 'Attachment';
        this.messageService.sendAttachment(msg.file)
        .subscribe(data => {
            let res = JSON.parse(data['_body']);
            messages = {
              "content": typeof msg.message === "undefined" || !msg.message ? {} : msg.message,
              "mediaId": res.id,
              "filename": msg.file.name,
              "@type": type
            };
            console.log('msg',messages);

            this.sendMessage(messages);
        },err => {
          this.toaster.pop('error', JSON.parse(err._body).error);
        });
    }
    else {
      messages = {
        "content": typeof msg.message === "undefined" || !msg.message ? {} : msg.message,
        "@type": type
      };
      this.sendMessage(messages);
    }
  }

  sendMessage(messages) {
    this.messageService.sendMessage(messages,this.channelId)
    .subscribe(result => {
    },err => {
      this.toaster.pop('error', JSON.parse(err._body).error);
    });
  }
}
