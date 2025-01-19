import { Component } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private service: LoginServiceService, private router: Router) { }

  onLogin() {
    this.errorMessage = '';
    const data = { username: this.username, password: this.password };
    this.service.adminLogin(data).subscribe(
      (response: any) => {
        if (response.success) {
          this.router.navigate(['/adminPortal']);
        } else {
          this.errorMessage = 'Invalid username or password.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again.';
      }
    );
  }
}