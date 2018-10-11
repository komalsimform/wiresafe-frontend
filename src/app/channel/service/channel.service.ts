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
  public ischeckpage = new BehaviorSubject<boolean>(false);
  
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
  checkpage(ischeck) {
    this.ischeckpage.next(true);
    return ischeck;
  }
}
