import { Injectable } from '@angular/core';
import { ApiService} from '../../shared/services/apiservice.service';
import { Channel } from '../model/channel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private apiService:ApiService) { }


  //Get channel list
  channelList() : Observable<Channel> {
      return this.apiService.get('/channel/');
  }

  //Get channel info
  channelDetail(channelid): Observable<Channel> {
    return this.apiService.get('/channel/'+ channelid);
  }
}
