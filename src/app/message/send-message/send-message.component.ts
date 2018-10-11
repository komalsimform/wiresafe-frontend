import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Message } from '../model/message';
import { FileUploader } from 'ng2-file-upload';
import {ToasterService} from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  newMessage:any;
  isupload:boolean = false;
  files:any = '';
  filetype:boolean;
  public uploader:FileUploader = new FileUploader({
    allowedFileType: ["pdf", "xls", "image"]
  });
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  isDisabled:boolean = false;
  @Output() messageChangevalue = new EventEmitter();
 
  constructor(private messageService:MessageService,private toaster:ToasterService,private route: ActivatedRoute) {
    if(this.newMessage === undefined && this.uploader.queue.length === 0) {
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;
   }
  }

  ngOnInit() {
  }

  
 
  filechanges(event){
    this.isupload = true;
    if(this.uploader.queue.length === 0) {
      this.toaster.pop('error', 'This file is not supported');
    }
    else {
      this.isDisabled = false;
      this.uploader.queue.forEach(data => {
      this.files = data._file;
    });
      
    }
    this.uploader = new FileUploader({allowedFileType: ["pdf", "xls", "image"]});
  }

  sendMessage() {
    if(this.files === '' && (this.newMessage === undefined || this.newMessage === '')) {
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;
      let result = {
        message: this.newMessage,
        files:this.files
      }
      console.log('send msg',result);
      this.messageChangevalue.emit(result);    
      this.newMessage = '';
      this.isupload = false;
      this.isDisabled = true;
      this.files = '';
   }
  
 }

  removeFile(file) {
    this.files = '';
    if(this.files !== '' && (this.newMessage === undefined || this.newMessage === '')) {
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;
    }
  }
  onSearchChange(val) {
    if(this.newMessage === undefined) {
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;
   }
  }
}
