import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.css']
})
export class AttachmentListComponent implements OnInit {
  attachmentList:any = [];
  channelId:string = '';
  constructor(private messageService:MessageService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(result => {
      this.channelId = result['channelid'];
    });
    this.getAttachmentList();
  }

  getAttachmentList() {
    this.messageService.getAttachmentList(this.channelId)
      .subscribe(result => {
        this.attachmentList = JSON.parse(result._body).messages;
      });
  }

  downloadAttachment(item) {
      this.messageService.downloadAttachment(item.mediaId).subscribe(blob => {
      saveAs(blob, item.filename);
    });
  }


}
