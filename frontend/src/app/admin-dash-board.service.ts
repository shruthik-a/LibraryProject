import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDashBoardService {

  private apiUrl = 'http://localhost:3000/admin/dashboard';

  constructor(private http: HttpClient) { }

  getTotalBooks(): Observable<{ totalBooks: number }> {
    return this.http.get<any>(`${this.apiUrl}/totalBooks`);
  }

  getTotalUsers(): Observable<{ totalUsers: number }> {
    return this.http.get<any>(`${this.apiUrl}/totalUsers`);
  }

  getBooksDue(): Observable<{ booksDue: number }> {
    return this.http.get<any>(`${this.apiUrl}/booksDue`);
  }

  getNotReturnedBooks(): Observable<{ notreturned: number }> {
    return this.http.get<any>(`${this.apiUrl}/notReturnedBooks`);
  }
}