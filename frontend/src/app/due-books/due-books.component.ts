import { Component } from '@angular/core';
import { DueBooksService } from '../due-books.service';

@Component({
  selector: 'app-due-books',
  templateUrl: './due-books.component.html',
  styleUrls: ['./due-books.component.css']
})
export class DueBooksComponent {
  booksDueForReturn: any[] = [];
  errorMessage: string = '';

  constructor(private service: DueBooksService) { }

  ngOnInit(): void {
    this.fetchBooksDueForReturn();
  }

  fetchBooksDueForReturn(): void {
    this.service.getBooksDueForReturn().subscribe((res) => {
      this.booksDueForReturn = res;
    })
  }

  notifyUser(book: any): void {
    this.service.notifyUser(book).subscribe(
      (response) => {
        alert('Notification sent successfully!');
      },
      (error) => {
        const errorMessage = error?.error?.message;
        alert(errorMessage);
      }
    );
  }
}