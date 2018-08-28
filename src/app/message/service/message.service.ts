import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { ApiService} from '../../shared/services/apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private apiService:ApiService) { }


  //Send a new message in a room
  sendMessage(message:Message): Observable<Message> {
    return this.apiService.post('/channel/'+ message.channelId + '/messages/',message);
  }

  //Get messages from a room
  getAllMessages(msg:Message) : Observable<Message> {
    return this.apiService.get('/channel/'+ msg.channelId + '/messages/');
  }

  // Get latest incoming messages
  syncMessages(message:Message): Observable<Message> {
    return this.apiService.get('/sync');
  }
}
