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
    if(loginid === '/user/4075736572313a6e656f2e77697265736166652e636f6d') {
      //user-1
      header.append('x-api-key', `MDAxZWxvY2F0aW9uIG5lby53aXJlc2FmZS5jb20KMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID0gMQowMDJhY2lkIHVzZXJfaWQgPSBAdXNlcjE6bmVvLndpcmVzYWZlLmNvbQowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWNpZCBub25jZSA9IE0xSmZ6X3NMTmRZU35lblAKMDAyZnNpZ25hdHVyZSAgQ4ddOWCC1rIz0JzhYZDwU6iedcKDErw2Nt3rnjw-Ewo`);
    }
    else {
      //user-2
      header.append('x-api-key', `MDAxZWxvY2F0aW9uIG5lby53aXJlc2FmZS5jb20KMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID0gMQowMDJhY2lkIHVzZXJfaWQgPSBAdXNlcjI6bmVvLndpcmVzYWZlLmNvbQowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWNpZCBub25jZSA9IDpfcGlEOEhlejdYUjBHVmEKMDAyZnNpZ25hdHVyZSCDxCqw2WtUOdZyXVw4P3zxKvAD1sGi28CgJU24FT4RDgo`);
    }
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
