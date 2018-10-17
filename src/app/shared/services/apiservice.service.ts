import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {Http, Headers, RequestOptions, ResponseContentType} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:Http) { }

  private setHeaders() {
    var loginid = localStorage.getItem('loginuserid');
    let header = new Headers();
    let apikey = localStorage.getItem('APIKey');
    let userid = localStorage.getItem('Id');
      header.append('x-api-key', apikey);
    // header.append('Content-Type','application/json');

    
    return header;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`,{headers:this.setHeaders()});
  }

  getAttachment(path: string,params: HttpParams = new HttpParams()): Observable<any> {
    let options = new RequestOptions({responseType: ResponseContentType.Blob,headers: this.setHeaders()});
    return this.http.get(`${environment.apiUrl}${path}`,options);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    );
  }

  postAttachment(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body,
      { headers: this.setHeaders() }
    );
  }


}
