import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailService } from '../user-detail.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  activeTab: string = 'borrowedBooks';
  borrowedBooks: any[] = [];
  fines: any[] = [];
  userId: any;

  constructor(private route: ActivatedRoute, private service: UserDetailService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.fetchBorrowedBooks();
    this.fetchFines();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  fetchBorrowedBooks(): void {
    this.service.getBorrowedBooks(this.userId).subscribe(
      (data) => {
        this.borrowedBooks = data;
      }
    );
  }

  fetchFines(): void {
    this.service.getFines(this.userId).subscribe(
      (data) => {
        this.fines = data;
      }
    );
  }
}