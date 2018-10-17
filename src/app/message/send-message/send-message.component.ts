import { Component, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../service/message.service';
import { FileUploader } from 'ng2-file-upload';
import {ToasterService} from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {
  newMessage:any;
  isUpload:boolean = false;
  file:any = '';
  filetype:boolean;
  public uploader:FileUploader = new FileUploader({
    allowedFileType: ["pdf", "xls", "image"]
  });
  isDisabled:boolean = false;
  @Output() messageTextValue = new EventEmitter();
 
  constructor(private toaster:ToasterService) {
    if(this.newMessage === undefined && this.uploader.queue.length === 0) {
      this.setIsDisabled(true);
    }
    else {
      this.setIsDisabled(false);
   }
  }

 
  filechanges(event){
    this.isUpload = true;
    if(this.uploader.queue.length === 0) {
      this.toaster.pop('error', 'This file is not supported');
    }
    else {
      this.setIsDisabled(false);
      this.uploader.queue.forEach(data => {
      this.file = data._file;
    });
      
    }
    this.uploader = new FileUploader({allowedFileType: ["pdf", "xls", "image"]});
  }

  sendMessage() {
    if(this.file === '' && (this.newMessage === undefined || this.newMessage === '')) {
      this.setIsDisabled(true);
    }
    else {
      this.setIsDisabled(false);
      let result = {
        message: this.newMessage,
        file:this.file
      }
      this.messageTextValue.emit(result);
      this.newMessage = '';
      this.isUpload = false;
      this.setIsDisabled(true);
      this.file = '';
   }
  
 }

  removeFile(file) {
    this.file = '';
    if(file && (this.newMessage === undefined || this.newMessage === '')) {
      this.setIsDisabled(true);
    }
    else {
      this.setIsDisabled(false);
    }
  }

  onTextChange(val) {
      if(this.newMessage === undefined) {
        this.setIsDisabled(true);
      }
      else {
        this.setIsDisabled(false);
    }
  }

  setIsDisabled(data) {
    this.isDisabled = data;
  }
}
