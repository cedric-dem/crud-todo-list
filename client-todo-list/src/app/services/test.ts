import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:8080/api/test';

  constructor(private http: HttpClient) {}

  getTest(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}
