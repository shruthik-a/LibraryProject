import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

  insertUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateUser(data: any, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}