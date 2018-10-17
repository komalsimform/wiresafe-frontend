import { Component, Input } from '@angular/core';
import { MessageService } from '../service/message.service';
import {saveAs} from "file-saver";


@Component({
  selector: 'app-incoming-messages',
  templateUrl: './incoming-messages.component.html',
  styleUrls: ['./incoming-messages.component.css']
})
export class IncomingMessagesComponent  {
  @Input() incomingMessage:any;

  constructor(private messageService:MessageService) { }

  downloadFiles(item) {
    this.messageService.downloadAttachment(item.mediaId).subscribe(blob => {
      saveAs(blob, item.filename);
    });
  }

}
