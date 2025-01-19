import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivationRequestService {

  private apiUrl = 'http://localhost:3000/activationRequest';

  constructor(private http: HttpClient) { }

  getRequests(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  allowAccess(requestId: number, memberId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/allow`, { requestId, memberId });
  }
}
