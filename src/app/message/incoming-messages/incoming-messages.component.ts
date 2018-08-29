import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-incoming-messages',
  templateUrl: './incoming-messages.component.html',
  styleUrls: ['./incoming-messages.component.css']
})
export class IncomingMessagesComponent implements OnInit {
  @Input() incomingmsg:any;
  constructor() { }

  ngOnInit() {
    
  }

}
