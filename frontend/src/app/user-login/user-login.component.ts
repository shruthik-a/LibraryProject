import { Component } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent {

  currentTab: string = 'login';
  loginData = { email: '', password: '' };
  registerData = { email: '', password: '', name: '', phoneNumber: '', plan: '', currentDate: '', endDate: '' };
  amountToPay: number = 0;
  isPaid: boolean = false;
  loginErrorMessage: string = '';
  registerErrorMessage: string = '';
  registerSuccessMsg: string = '';

  datas: any;
  loginAction: string | null = null;

  constructor(private service: LoginServiceService, private route: Router) { }

  setTab(tab: string): void {
    this.currentTab = tab;
  }

  calculateAmount(): void {
    if (this.registerData.plan === 'basic') {
      this.amountToPay = 80;
    } else if (this.registerData.plan === 'premium') {
      this.amountToPay = 120;
    } else {
      this.amountToPay = 0;
    }
  }

  markAsPaid(): void {
    this.isPaid = true;
  }

  onRegisterSubmit(): void {
    this.registerErrorMessage = '';
    const currentDate = new Date();
    this.registerData.currentDate = currentDate.toISOString();
    let endDate = new Date(currentDate);
    if (this.registerData.plan === 'basic') {
      endDate.setMonth(endDate.getMonth() + 6);
    } else if (this.registerData.plan === 'premium') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    this.registerData.endDate = endDate.toISOString();
    this.service.checkUserExist(this.registerData.email).subscribe(
      (res) => {
        if (res.success) {
          this.registerErrorMessage = 'User already exists. Please log in.';
          this.registerData = { email: '', password: '', name: '', phoneNumber: '', plan: '', currentDate: '', endDate: '' };
        } else {
          this.service.registerUser(this.registerData).subscribe(
            (res) => {
              this.registerSuccessMsg = "Registered Successfully!";
              this.registerData = { email: '', password: '', name: '', phoneNumber: '', plan: '', currentDate: '', endDate: '' };
            }
          );
        }
      }
    );
  }

  payForExceedingLimit(): void {
    this.service.payAmount(this.datas.PlanID, this.datas.ID).subscribe((res) => {
      alert("Payment Successfull!. Now you can LogIn.");
      this.loginErrorMessage = '';
      this.loginAction = null;
    })
  }

  requestActivation(): void {
    this.service.requestActivation(this.datas.ID).subscribe(
      (res: any) => {
        if (res.success) {
          this.loginErrorMessage = 'Activation request sent successfully!';
        } else {
          this.loginErrorMessage = 'Failed to send activation request.';
        }
      },
      (error) => {
        if (error.status === 400) {
          this.loginErrorMessage = 'Request has already been sent!. Waiting for Admin approval.';
        } else {
          this.loginErrorMessage = 'An error occurred. Please try again later.';
        }
      }
    );
  }

  onLoginSubmit(): void {
    this.loginErrorMessage = '';
    this.loginAction = null;
    this.service.checkUserExist(this.loginData.email).subscribe(
      (res) => {
        if (res.success) {
          this.datas = res.data[0];
          if (this.datas.Status === 'Active' && this.datas.ReinstatementCount < 2) {
            this.service.loginUser(this.loginData).subscribe(
              (loginRes: any) => {
                if (loginRes.success) {
                  const userId = loginRes.user.ID;
                  this.route.navigate(['/userPortal', userId]);
                } else {
                  this.loginErrorMessage = 'Invalid username or password.';
                }
              }
            );
          } else if (this.datas.Status === 'InActive' && this.datas.ReinstatementCount < 2) {
            this.loginAction = 'Request Activation';
            this.loginErrorMessage = 'Account Deactivated!.Request for activation.';
          } else if (this.datas.ReinstatementCount >= 2) {
            this.loginAction = 'Pay 80';
            this.loginErrorMessage = 'Warning limit exceeds!.Please pay to LogIn.';
          } else {
            this.loginErrorMessage = 'Invalid user status or reinstatement limit.';
          }
        } else {
          this.loginErrorMessage = 'User not found. Please register first.';
        }
      },
      (error) => {
        this.loginErrorMessage = 'An error occurred while checking the user.';
      }
    );
  }
}