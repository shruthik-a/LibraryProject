import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
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

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'loginOption', component: LoginOptionComponent },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'userLogin', component: UserLoginComponent },
  { path: 'userPortal/:userId', component: UserPortalComponent },
  {
    path: 'adminPortal',
    component: AdminPortalComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'books', component: AdminBookComponent },
      { path: 'users', component: ManageUsersComponent },
      {
        path: 'users/userDetails/:id',
        component: UserDetailsComponent
      },
      { path: 'returnEntry', component: ReturnEntryComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'dueBooks', component: DueBooksComponent },
      { path: 'fines', component: FinesComponent },
      { path: 'activationRequest', component: ActivationRequestComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
