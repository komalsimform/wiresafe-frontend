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
  sendMessage(message): Observable<Message> {
    return this.apiService.post(message.channelId + '/messages/',message.content);
  }

  //Get messages from a room
  getAllMessages(channel) : Observable<any> {
    return this.apiService.get(channel + '/messages/');
    // return this.http.get("./assets/JSON/message.json");
    // .pipe(map(response => {
    //   return response;
    // }));
  }

  // Get latest incoming messages
  syncMessages(message:Message): Observable<Message> {
    return this.apiService.get('/sync');
  }

  msgdata(data) {
    this.messages.next(data);
  }

   //Get attachment list
   attachmentList() : Observable<any> {
    return this.http.get("./assets/JSON/attachment-list.json");
  }
}
