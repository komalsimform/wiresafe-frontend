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
  filedetail:any;
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
    // console.log('file changes call',this.uploader);
    this.filedetail = this.uploader.queue[0]._file;
    if(this.uploader.queue.length === 0) {
      console.log('error');
      this.toaster.pop('error', 'This file is not supported');
    }
    else {
      console.log('length',this.uploader.queue.length);
      console.log('file changes call',this.uploader.queue);
      
      this.uploader.queue.forEach(data => {
        console.log('for each',data);
        this.fileslist.push(data._file);
      });
      console.log('attchment.......',this.fileslist);
      // this.fileslist = this.uploader.queue;
      
      // document.getElementById("filename").innerHTML = this.uploader.queue[0]._file.name;
    }
    this.uploader = new FileUploader({allowedFileType: ["pdf", "xls", "image"]});
  }

  sendMessage() {
    this.valueChange.emit(this.newMessage);
    this.newMessage = '';
    console.log('attchment',this.fileslist);
  }

  // uploadFile(data) {
  //   console.log('data..',data.srcElement.value);
  //   document.getElementById("file-name").innerHTML ='abc.jpeg';
  // }
  removeFile(file) {
    console.log('remove file cl',file);
    let list_ = this.fileslist;
    const index: number = list_.indexOf(file);
    console.log('index',index);
    this.fileslist.splice(list_.indexOf(file), 1);
    // this.isupload = false;
    console.log('file list',list_);
    this.fileslist = list_;
  }
}
