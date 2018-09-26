import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Message } from '../model/message';
import { ApiService} from '../../shared/services/apiservice.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages = new BehaviorSubject<any>('');

  constructor(private apiService:ApiService,private http:HttpClient) { }


  //Send a new message in a room
  sendMessage(message,chnlid): Observable<Message> {
    console.log('service send msg',chnlid);
    console.log('service send msg',message);
    return this.apiService.post('/channel/' + chnlid + '/messages/',message);
  }

  //Get messages from a room
  getAllMessages(channelid) : Observable<any> {
    return this.apiService.get('/channel/'+ channelid + '/messages/');
  }

  // Get latest incoming messages
  syncMessages(message:Message): Observable<Message> {
    return this.apiService.get('/sync');
  }

  sendMsgdata(data) {
    this.messages.next(data);
  }

  sendAttachment(data) {
    console.log('service attchment....',data);
    return this.apiService.post('/media/upload',data);
  }

   //Get attachment list
   attachmentList() : Observable<any> {
    return this.http.get("./assets/JSON/attachment-list.json");
  }
}
