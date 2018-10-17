import { Component, Input } from '@angular/core';
import { MessageService } from '../service/message.service';
import {saveAs} from 'file-saver'

@Component({
  selector: 'app-outgoing-messages',
  templateUrl: './outgoing-messages.component.html',
  styleUrls: ['./outgoing-messages.component.css']
})
export class OutgoingMessagesComponent {
  @Input() outgoingMessage:any;
  constructor(private messageService:MessageService) { }

  downloadFiles(item) {
    this.messageService.downloadAttachment(item.mediaId).subscribe(blob => {
      saveAs(blob, item.filename);
    });
  }

}
