import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-outgoing-messages',
  templateUrl: './outgoing-messages.component.html',
  styleUrls: ['./outgoing-messages.component.css']
})
export class OutgoingMessagesComponent implements OnInit {

  @Input() outgoingmsg:any;
  constructor() { }

  ngOnInit() {
  }

}
