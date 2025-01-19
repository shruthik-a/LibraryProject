import { Component } from '@angular/core';
import { AdminDashBoardService } from '../admin-dash-board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  totalBooks: number = 0;
  totalUsers: number = 0;
  booksIssued: number = 0;
  booksDue: number = 0;
  notreturned: number = 0;

  constructor(private service: AdminDashBoardService, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getTotalBooks().subscribe(response => {
      this.totalBooks = response.totalBooks;
    });

    this.service.getTotalUsers().subscribe(response => {
      this.totalUsers = response.totalUsers;
    });

    this.service.getBooksDue().subscribe(response => {
      this.booksDue = response.booksDue;
    });

    this.service.getNotReturnedBooks().subscribe(response => {
      this.notreturned = response.notreturned;
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}