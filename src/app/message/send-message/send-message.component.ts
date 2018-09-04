import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Message } from '../model/message';
import { FileUploader } from 'ng2-file-upload';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  newMessage:any;
  public uploader:FileUploader = new FileUploader({
    allowedFileType: ["pdf", "xls", "image"]
  });
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  @Output() valueChange = new EventEmitter();
 
 
  constructor(private messageService:MessageService,private toaster:ToasterService) { }

  ngOnInit() {
  }

  sendMessage() {
    this.valueChange.emit(this.newMessage);
    this.newMessage = '';
  }

  filechanges(){
    console.log('file changes call',this.uploader);
    if(this.uploader.queue.length === 0) {
      console.log('error');
      this.toaster.pop('error', 'This file is not supported');
    }
    else {
      console.log('file changes call',this.uploader.queue[0]._file);
    }
    this.uploader = new FileUploader({allowedFileType: ["pdf", "xls", "image"]});
  }

}
