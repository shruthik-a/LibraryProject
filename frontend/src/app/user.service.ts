import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  getUserDetails(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  fetchBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getMaximumBookCount(userId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bookCount/${userId}`);
  }

  addTransaction(transactionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addTransaction`, transactionData);
  }

  getBorrowedBooks(memberId: any): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/getBorrowedBooks/${memberId}`);
  }

  removeBook(bookId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/book/${bookId}`);
  }

  getFineDetails(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/fines`);
  }


  getUserNotifications(userID: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/notifications/${userID}`);
  }

  deleteNotification(notificationID: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${notificationID}`);
  }

  updateFineStatus(fineId: number, paidStatus: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateFineStatus`, { fineId, paidStatus });
  }
}