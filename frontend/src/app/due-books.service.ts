import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DueBooksService {

  private apiUrl = 'http://localhost:3000/dueBooks';

  constructor(private http: HttpClient) { }

  getBooksDueForReturn(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  notifyUser(book: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/notify`, book);
  }
}
