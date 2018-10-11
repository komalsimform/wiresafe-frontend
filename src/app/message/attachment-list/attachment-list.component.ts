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
  channelid:string = '';
  constructor(private messageService:MessageService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(result => {
      this.channelid = result['channelid'];
      // this.messageService.sendChannelid(this.channelid);
    });
    this.getAttachmentList();

  }

  getAttachmentList() {
    this.messageService.getAttachmentList(this.channelid)
      .subscribe(result => {
        let res = JSON.parse(result._body);
        this.attachmentList = res.messages;
      });
  }

  downloadAttachment(item) {
      this.messageService.downloadAttachment(item.mediaId).subscribe(blob => {
      saveAs(blob, item.filename);
    });
  }


}
