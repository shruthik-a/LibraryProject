import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { LoginServiceService } from './login-service.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { LoginOptionComponent } from './login-option/login-option.component';
import { HomeComponent } from './home/home.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminBookComponent } from './admin-book/admin-book.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CategoryComponent } from './category/category.component';
import { ReturnEntryComponent } from './return-entry/return-entry.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DueBooksComponent } from './due-books/due-books.component';
import { FinesComponent } from './fines/fines.component';
import { ActivationRequestComponent } from './activation-request/activation-request.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    UserLoginComponent,
    AdminPortalComponent,
    LoginOptionComponent,
    HomeComponent,
    UserPortalComponent,
    AdminDashboardComponent,
    AdminBookComponent,
    ManageUsersComponent,
    CategoryComponent,
    ReturnEntryComponent,
    UserDetailsComponent,
    DueBooksComponent,
    FinesComponent,
    ActivationRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LoginServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
