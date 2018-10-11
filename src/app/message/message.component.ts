import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy ,DoCheck } from '@angular/core';
import { MessageService } from './service/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';
import { ToasterService } from 'angular2-toaster';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit ,DoCheck  {
  messageList:any = [];
  loginuserid:string;
  channelid:any;
  lastScrollTop: number = 0;
  direction: string = "";
  newList:any = [];
  // @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  //scroll
 

  constructor(private messageService:MessageService,private route: ActivatedRoute,private router:Router,private toaster:ToasterService,private zone: NgZone,private cdRef: ChangeDetectorRef) {

    window.onscroll = () => {
      let st = window.pageYOffset;
      let dir = '';
      let list:any = [];
      if (st > this.lastScrollTop) {
        console.log('down');
          // dir = "down";
          // let nexttoken = localStorage.getItem('nexttoken');
          // console.log('nexttoken',nexttoken);
          // if(nexttoken !== null) {
          //   this.messageService.getAllMessageswithPrevToken(this.channelid,nexttoken)
          //   .subscribe(result => {
          //     // localStorage.setItem('nexttoken',JSON.parse(result._body).token.next);
          //     if(result.status === 200) {
          //       list.push(JSON.parse(result._body).messages);
          //       this.messageList = list;
          //     console.log('success next msg',this.messageList);

          //     }
          //     else {
          //       this.toaster.pop('error', result.statusText);
          //     }
          //   });
          // }

      } else {
        console.log('up',this.lastScrollTop);
          dir = "up";
          // if(this.lastScrollTop === 1) {
            let prev = localStorage.getItem('previoustoken');
            console.log('prev token',prev);
            this.messageService.getAllMessageswithPrevToken(this.channelid,prev)
              .subscribe(result => {
                console.log('prev token',JSON.parse(result._body).token.previous);
                localStorage.setItem('previoustoken',JSON.parse(result._body).token.previous);
                localStorage.setItem('nexttoken',JSON.parse(result._body).token.next);
                this.messageList = this.messageList.reverse();
                if(result.status === 200) {
                  this.zone.run(() => {
                  JSON.parse(result._body).messages.forEach((res,index) => {
                    this.messageList.push(res);
                    this.cdRef.detectChanges();
                    // console.log(JSON.parse(result._body).messages.length);
                  // repItem.push(res);
                  //   if(JSON.parse(result._body).messages.length == index + 1) {
                  //     this.messageList = repItem;
                  //     console.log('item',this.messageList);
                  //     this.cdRef.detectChanges();
                  //   }
                  });
                });
                console.log('before',this.messageList);

                this.messageList = this.messageList.reverse();
                console.log('success prev msg',this.messageList);
                }
                else {
                  this.toaster.pop('error', result.statusText);
                }
              });
          }
      }
      // this.lastScrollTop = st;
      // lc.run(() => {
      //   this.direction = dir;
      // });
    };

  //  }
  
  ngOnInit() {
    this.route.params.subscribe(result => {
      this.channelid = result['id'];
      this.messageService.sendChannelid(this.channelid);
    });
    

    this.loginuserid = localStorage.getItem('loginuserid');
      Observable.interval(2000)
      .subscribe((val) => { this.syncMessagewithToken() });
    this.getMessages();

  }

  ngDoCheck() {        
    this.cdRef.detectChanges(); 
} 

public trackItem (index: number, item: any) {
  return item['@id'];
}

// scrollToBottom(): void {
//     try {
//         this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
//     } catch(err) { }           
// }


//   onScrollDown () {
//     console.log('scrolled down!!');
// }

// onScrollUp () {
//   console.log('scrolled up!!');
// }

  getMessages() {
    let list:any = [];
    // this.messageList = [];
    this.messageService.messages
      .subscribe(result => {
        if(result === '' || result === null){
          this.messageService.getAllMessages(this.channelid) 
              .subscribe(data => {
                console.log('msg success',JSON.parse(data._body));
                localStorage.setItem('previoustoken',JSON.parse(data._body).token.previous);
                if(data.status === 200) {
                  this.messageList = (JSON.parse(data._body).messages);
                  // this.newList = JSON.parse(data._body).messages;
                 }
                 else {
                   this.toaster.pop('error', data.statusText);
                 }
              });
        }
        else {
              // this.messageList = result;
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
    // console.log('success msg token',this.messageList);
    let token = localStorage.getItem('syncMessageToken');
    console.log('tokn',token);
    if(token !== null) {
      this.messageService.syncMessageswithToken(token)
        .subscribe(data => {
          localStorage.removeItem('syncMessageToken');
          // console.log('sync data',JSON.parse(data['_body']));
          if(JSON.parse(data['_body']).messages.length > 0) {
            localStorage.setItem('syncMessageToken',JSON.parse(data['_body']).nextToken);
            this.messageList.push(JSON.parse(data['_body']).messages[0]);
          }
        });
    }
  }

  sendMessage(msg) {
    let newmsg = null;
    let type = 'Text';
    let filename:any = [];
    let newjson;
    let mediaid = [];
    if(msg.files !== "") {;
      type = 'Attachment';
        filename = msg.files.name;
        this.messageService.sendAttachment(msg.files)
        .subscribe(data => {
          if(data.status === 200) {
            let res = JSON.parse(data['_body']);
            mediaid.push(res.id);
            if(msg.message !== undefined) {
              newmsg = msg.message;
            }
            newjson = {
              "content": newmsg,
              "mediaId": mediaid,
              "filename": filename,
              "@type": type
            };
            this.sendNewMessage(newjson);
            }
            else {
              this.toaster.pop('error', data.statusText);
            }
        });
    }
    else {
      if(msg.message !== undefined) {
        newmsg = msg.message;
      }
      newjson = {
        "content": newmsg,
        "@type": type
      };
      this.sendNewMessage(newjson);
    }
  }

  sendNewMessage(newjson) {
    this.messageService.sendMessage(newjson,this.channelid)
    .subscribe(result => {
      if(result.status === 200) {
        this.syncMessages();
        this.syncMessagewithToken();
      }
      else {
        this.toaster.pop('error', result.statusText);
      }
    });
  }
}
