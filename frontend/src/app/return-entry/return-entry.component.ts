import { Component } from '@angular/core';
import { ReturnEntryService } from '../return-entry.service';

@Component({
  selector: 'app-return-entry',
  templateUrl: './return-entry.component.html',
  styleUrls: ['./return-entry.component.css']
})
export class ReturnEntryComponent {

  transactions: any[] = [];
  searchUserID: string = '';

  constructor(private service: ReturnEntryService) { }

  ngOnInit() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.service.getNotReturnedBooks().subscribe((res) => {
      this.transactions = res;
    })
  }

  filteredTransactions() {
    if (!this.searchUserID) {
      return this.transactions;
    }
    return this.transactions.filter(transaction =>
      transaction.MemberID.toString().includes(this.searchUserID)
    );
  }

  markAsReturned(transactionID: number, BookID: number) {
    this.service.updateReturnStatus(transactionID, BookID).subscribe(
      response => {
        alert('Status updated successfully');
        this.fetchTransactions();
      }
    );
  }

  markAsDamaged(transactionID: number, bookID: number, MemberID: number) {
    if (confirm('Are you sure you want to mark this book as damaged?')) {
      this.service.updateDamageStatus(transactionID, bookID, MemberID).subscribe(
        (response) => {
          alert('Book marked as damaged');
          this.fetchTransactions();
        }
      );
    }
  }
}