import { Injectable } from '@angular/core';
import { ApiService} from '../../shared/services/apiservice.service';
import { Channel } from '../model/channel';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  public setPageHeaders = new BehaviorSubject<any>('');
  
  constructor(private apiService:ApiService,private http:HttpClient) { }

  

  //Get channel list
  channelList() : Observable<any> {
      return this.apiService.get('/channel/');
  }

  //Get channel info
  channelDetail(channelid): Observable<Channel> {
    return this.apiService.get('/channel/'+ channelid);
  }

  //check page for headers
  checkpage(data) {
   return this.setPageHeaders.next(data);
  }
}
