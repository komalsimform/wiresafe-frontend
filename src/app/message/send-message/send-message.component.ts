import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Message } from '../model/message';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  newMessage:any;
  @Output() valueChange = new EventEmitter();
 
 
  constructor(private messageService:MessageService) { }

  ngOnInit() {
  }

  sendMessage() {
    this.valueChange.emit(this.newMessage);
    this.newMessage = '';
  }

}
