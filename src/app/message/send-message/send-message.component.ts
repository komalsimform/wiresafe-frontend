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
  isupload:boolean = false;
  fileslist:any=[];
  filetype:boolean;
  public uploader:FileUploader = new FileUploader({
    allowedFileType: ["pdf", "xls", "image"]
  });
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  @Output() valueChange = new EventEmitter();
 
 
  constructor(private messageService:MessageService,private toaster:ToasterService) { }

  ngOnInit() {
  }

  filechanges(){
    this.isupload = true;
    if(this.uploader.queue.length === 0) {
      this.toaster.pop('error', 'This file is not supported');
    }
    else {
      this.uploader.queue.forEach(data => {
        this.fileslist.push(data._file);
      });
    }
    this.uploader = new FileUploader({allowedFileType: ["pdf", "xls", "image"]});
  }

  sendMessage() {
    this.valueChange.emit(this.newMessage);
    this.newMessage = '';
  }

  // uploadFile(data) {
  //   console.log('data..',data.srcElement.value);
  //   document.getElementById("file-name").innerHTML ='abc.jpeg';
  // }
  removeFile(file) {
    let list_ = this.fileslist;
    const index: number = list_.indexOf(file);
    this.fileslist.splice(list_.indexOf(file), 1);
    this.fileslist = list_;
  }
}
