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
  fileslist:any=[];
  filetype:boolean;
  public uploader:FileUploader = new FileUploader({
    allowedFileType: ["pdf", "xls", "image"]
  });
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  @Output() messageChangevalue = new EventEmitter();
 
 
  constructor(private messageService:MessageService,private toaster:ToasterService,private route: ActivatedRoute) { }

  ngOnInit() {
   
  }

  filechanges(event){
    
    const file = event.target.files;
    console.log('file change',file);
    // item.binary = event;
    var r = new FileReader();
    // r.onload = function(e) { 
      
    // }
    
    this.isupload = true;
    if(this.uploader.queue.length === 0) {
      this.toaster.pop('error', 'This file is not supported');
    }
    else {
      this.uploader.queue.forEach(data => {
        let res = r.readAsArrayBuffer(data._file);
    console.log('binary....',res);
        this.fileslist.push(data._file);
      });
    }
    this.uploader = new FileUploader({allowedFileType: ["pdf", "xls", "image"]});
  }

  sendMessage() {
    console.log('file list',this.fileslist);
    let result = {
      message: this.newMessage,
      files:this.fileslist
    }
    this.messageChangevalue.emit(result);
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
