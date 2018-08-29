import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Message } from '../model/message';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  @Input() sharedVar: string;
  @Output() sharedVarChange = new EventEmitter();
 
  constructor(private messageService:MessageService) { }

  ngOnInit() {
  }

  change(newValue) {
    // console.log('newvalue', newValue)
    // this.sharedVar = newValue;
    this.sharedVarChange.emit(newValue);
  }

  sendMessage() {
    console.log('send msg',this.sharedVar);
    let message = new Message();
    message.content = this.sharedVar;
    // message.channelId
    this.messageService.sendMessage(message)
      .subscribe(result => {
        console.log('success send msg',result);
      });
  }

}
