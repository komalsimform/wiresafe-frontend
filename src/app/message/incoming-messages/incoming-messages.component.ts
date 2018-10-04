import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../service/message.service';
import {saveAs} from "file-saver";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-incoming-messages',
  templateUrl: './incoming-messages.component.html',
  styleUrls: ['./incoming-messages.component.css']
})
export class IncomingMessagesComponent implements OnInit {
  @Input() incomingmsg:any;

  constructor(private messageService:MessageService) { }

  ngOnInit() {
  }

  downloadFiles(item) {
    this.messageService.downloadAttachment(item.mediaId).subscribe(blob => {
      saveAs(blob, item.filename);
    });
  }

}
