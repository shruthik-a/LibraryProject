import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bookId}`);
  }
}
