import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  private apiUrl = 'http://localhost:3000/userDetail';

  constructor(private http: HttpClient) { }

  getBorrowedBooks(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/borrowedBooks/${userId}`);
  }

  getFines(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fines/${userId}`);
  }
}
