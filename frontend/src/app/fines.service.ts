import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinesService {

  private apiUrl = 'http://localhost:3000/fines';

  constructor(private http: HttpClient) { }

  getFines(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  notifyUser(fine: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/notify`, fine);
  }
}
