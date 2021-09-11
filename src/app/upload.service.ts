import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http :  HttpClient) { }

  uploadResume(form : FormData): Observable<any>{
    return this.http.post('/rest/upload/cv',form, { responseType: 'text'  });
  }

}
