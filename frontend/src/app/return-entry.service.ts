import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReturnEntryService {

  apiUrl = "http://localhost:3000/returnEntry";


  constructor(private http: HttpClient) { }

  getNotReturnedBooks(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl);
  }

  updateReturnStatus(transactionID: number, BookID: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, { transactionID, BookID });
  }

  updateDamageStatus(transactionID: number, bookID: number, MemberID: number) {
    return this.http.put(`${this.apiUrl}/damage`, { transactionID, bookID, MemberID });
  }

}
