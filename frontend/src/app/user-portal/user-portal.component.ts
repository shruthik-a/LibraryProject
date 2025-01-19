import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css']
})
export class UserPortalComponent implements OnInit {

  user: any = {};
  borrowedBooks: any[] = [];
  fines: any[] = [];
  showBorrowedBooks: boolean = false;
  showFineDetails: boolean = false;
  searchQuery: string = '';
  books: any[] = [];
  filteredBooks: any[] = [];
  getID: any;
  isModalVisible: boolean = false;
  maxBookCount: any;

  notifications: any[] = [];

  constructor(private service: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getID = this.route.snapshot.paramMap.get('userId');
    this.service.getUserDetails(this.getID).subscribe(data => {
      this.user = data;
    });
    this.service.fetchBooks().subscribe(data => {
      this.books = data;
      this.filteredBooks = data;
    });
    this.fetchBorrowedBooks();
    this.fetchFineDetails();
    this.loadNotifications();
  }
  loadNotifications(): void {
    this.service.getUserNotifications(this.getID).subscribe(
      (data) => {
        this.notifications = data;
      }
    );
  }

  deleteNotification(notificationID: number): void {
    this.service.deleteNotification(notificationID).subscribe(
      (response) => {
        this.notifications = this.notifications.filter(
          (n) => n.ID !== notificationID
        );
      }
    );
  }

  filterBooks() {
    const query = this.searchQuery.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.Title.toLowerCase().includes(query)
      // (book.author && book.author.toLowerCase().includes(query)) ||
      // (book.year && book.year.toString().includes(query))
    );
  }

  toggleBorrowedBooks() {
    this.showBorrowedBooks = true;
    this.showFineDetails = false;
  }

  toggleFineDetails() {
    this.showFineDetails = true;
    this.showBorrowedBooks = false;
  }

  logout() {
    this.router.navigate(['/userLogin']);
  }

  calculateDueDate(): Date {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today;
  }

  showBorrowedBooksModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  removeBook(book: any): void {
    this.service.removeBook(book.BookID, this.getID).subscribe({
      next: (res) => {
        this.borrowedBooks = this.borrowedBooks.filter(b => b.BookID !== book.BookID);
      }
    });
  }

  borrowBook(book: any): void {
    this.service.getMaximumBookCount(this.getID).subscribe((res) => {
      this.maxBookCount = res[0].MaxBookAllowed;
      if (this.borrowedBooks.length >= this.maxBookCount) {
        this.showBorrowedBooksModal();
      } else {
        const transactionData = {
          BookID: book.BookID,
          MemberID: this.getID,
          IssuedDate: new Date(),
          DueDate: this.calculateDueDate(),
          ReturnedDate: null,
          ReturnedStatus: 'Not Returned',
          IsDelayed: 'No',
          IsDamaged: 'No'
        };
        this.service.addTransaction(transactionData).subscribe((res) => {
          alert("Book added!");
          this.fetchBorrowedBooks();
        })
      }
    });
  }

  fetchBorrowedBooks(): void {
    this.service.getBorrowedBooks(this.getID).subscribe((res) => {
      this.borrowedBooks = res;
    })
  }

  fetchFineDetails(): void {
    const userId = this.getID;
    this.service.getFineDetails(userId).subscribe({
      next: (data) => {
        this.fines = data;
      }
    });
  }

  payFine(fine: any): void {
    this.service.updateFineStatus(fine.fineId, true).subscribe(
      (response) => {
        fine.paidStatus = true;
      }
    );
  }
}