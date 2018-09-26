import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessageService } from './service/message.service';
import { Message } from './model/message';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
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
  newMessage;
  channelid:any;
  constructor(private messageService:MessageService,private route: ActivatedRoute,private router:Router,private datePipe: DatePipe) {
   
   }

  ngOnInit() {
    this.route.params.subscribe(result => {
      this.channelid = result['id'];
    });

    this.loginuserid = localStorage.getItem('loginuserid');
    this.getMessages();

    // Observable.interval(2000)
    // .subscribe((val) => { this.getMessages() });
  }

  getMessages() {
    let list:any = [];
    this.messageService.messages
      .subscribe(result => {
        if(result === '' || result === null){
          this.messageService.getAllMessages(this.channelid) 
              .subscribe(data => {
                list = JSON.parse(data._body).messages;
                // console.log('list',list);
                if(list.length > 0) {
                  list.forEach(res => {
                    res.date_ = this.datePipe.transform(res.timestamp,"MMM dd yyyy");
                    this.messageList.push(res);
                  });
                this.messageList = this.message(this.messageList,'date_');
              }
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
    console.log('msg comp',msg);
    let service = this.messageService;
    let chnlid = this.channelid;
    let newmsg = msg.message;
    let getmsg = this.getMessages();
    if(msg.files.length > 0) {
      var reader = new FileReader();
      var fileByteArray = [];
      let mediaid;
      reader.readAsArrayBuffer(msg.files[0]);
      reader.onloadend = function (evt) {
          if (evt.target.readyState == FileReader.DONE) {
             var arrayBuffer = evt.target.result,
                 array = new Uint8Array(arrayBuffer);
             for (var i = 0; i < array.length; i++) {
                 fileByteArray.push(array[i]);
              }
          }
          console.log('array',fileByteArray);
          service.sendAttachment(fileByteArray)
          .subscribe(result => {
            console.log('success attachment',result);
            mediaid = JSON.parse(result._body);
             console.log('success attachment...',mediaid.id);

            let newjson = {
              // channelId: chnlid,
              content: newmsg,
              // content: 'hii',
              mediaId: mediaid.id,
              filename: 'test.png'
              // "sender": this.loginuserid,
            };
            console.log('ch id..',chnlid);
             service.sendMessage(newjson,chnlid)
              .subscribe(result => {
                console.log('send msg success',result);
                // getmsg;
              });
          });
     
      }

      
    
    }
   
  }
}
