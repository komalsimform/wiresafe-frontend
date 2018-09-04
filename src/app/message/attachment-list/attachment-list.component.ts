import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.css']
})
export class AttachmentListComponent implements OnInit {
  attachmentList:any = [];
  constructor(private messageService:MessageService) { }

  ngOnInit() {
    this.getAttachmentList();
  }

  getAttachmentList() {
    this.messageService.attachmentList()
      .subscribe(result => {
        console.log('attachment list',result);
        this.attachmentList = result;
      });
  }


}
