import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminBookService {

  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bookId}`);
  }

  insertBook(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateBook(data: any, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}