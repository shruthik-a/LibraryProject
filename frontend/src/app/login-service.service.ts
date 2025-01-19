import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:3000";

  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${endpoint}`);
  }

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${endpoint}`, data);
  }

  checkUserExist(email: string): Observable<any> {
    return this.getData(`/checkUser?email=${email}`);
  }

  registerUser(data: any): Observable<any> {
    return this.postData('/registerUser', data);
  }

  loginUser(data: any): Observable<any> {
    return this.postData('/loginUser', data);
  }

  adminLogin(data: any): Observable<any> {
    return this.postData('/adminLogin', data);
  }

  requestActivation(MemberID: number) {
    return this.http.post(`${this.apiUrl}/requestActivation`, { MemberID });
  }

  payAmount(planId: number, memberId: number) {
    return this.http.put(`${this.apiUrl}/pay`, { planId, memberId });
  }
}
