import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:Http) { }

  private setHeaders() {
    let header = new Headers();
    header.append('x-api-key', `MDAxZWxvY2F0aW9uIG5lby53aXJlc2FmZS5jb20KMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID0gMQowMDJhY2lkIHVzZXJfaWQgPSBAdXNlcjI6bmVvLndpcmVzYWZlLmNvbQowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWNpZCBub25jZSA9IDpfcGlEOEhlejdYUjBHVmEKMDAyZnNpZ25hdHVyZSCDxCqw2WtUOdZyXVw4P3zxKvAD1sGi28CgJU24FT4RDgo`);
    return header;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`,{headers:this.setHeaders()});
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    );
  }


}
