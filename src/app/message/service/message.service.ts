import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Message } from '../model/message';
import { ApiService} from '../../shared/services/apiservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import {Http, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  handleError(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  public messages = new BehaviorSubject<any>('');
  public channelid = new BehaviorSubject<any>('');


  constructor(private apiService:ApiService,private http:Http) { }


  //Send a new message in a room
  sendMessage(message,chnlid) {
    return this.apiService.post('/channel/' + chnlid + '/messages/',message);
  }

  //Get messages from a room
  getAllMessages(channelid) : Observable<any> {
    return this.apiService.get('/channel/'+ channelid + '/messages/');
  }

  getAllMessageswithPrevToken(channelid,prevToken) {
    return this.apiService.get('/channel/'+ channelid + '/messages/?from='+ prevToken);
  }

  // Get latest incoming messages
  syncMessages(token): Observable<Message> {
    if(token !== null) {
      return this.apiService.get('/sync?since='+ token);
    }
    else {
      return this.apiService.get('/sync');
    }
  }

  // Send message data from one component to another
  sendMsgdata(data) {
    this.messages.next(data);
  }

  // Send attachment 
  sendAttachment(data) {
    return this.apiService.postAttachment('/media/upload',data);
  }

  //Download attachment
  downloadAttachment(mediaid): Observable<Blob> {
    return this.apiService.getAttachment("/media/download/"+ mediaid)
        .map(res => res.blob());
  }

  // send channel id
  setChannelid(id) {
    return this.channelid.next(id);
  }

  // get attachment list
  getAttachmentList(channelid) {
    return this.apiService.get('/channel/'+ channelid + '/messages/?type=Attachment');
  }
}
