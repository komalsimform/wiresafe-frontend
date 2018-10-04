import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../service/message.service';
import {saveAs} from 'file-saver'

@Component({
  selector: 'app-outgoing-messages',
  templateUrl: './outgoing-messages.component.html',
  styleUrls: ['./outgoing-messages.component.css']
})
export class OutgoingMessagesComponent implements OnInit {
  @Input() outgoingmsg:any;
  constructor(private messageService:MessageService) { }

  ngOnInit() {
  }
 

  downloadFiles(item) {
    this.messageService.downloadAttachment(item.mediaId).subscribe(blob => {
      saveAs(blob, item.filename);
    });
  }

}
