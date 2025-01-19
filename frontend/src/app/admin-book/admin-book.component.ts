import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminBookService } from '../admin-book.service';


@Component({
  selector: 'app-admin-book',
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin-book.component.css']
})
export class AdminBookComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  searchQuery: string = '';
  showModal: boolean = false;
  bookForm: FormGroup;
  selectedBook: any = null;

  constructor(private service: AdminBookService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      authorName: ['', Validators.required],
      categoryName: ['', Validators.required],
      year: ['', Validators.required],
      language: ['', Validators.required],
      totalCopies: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.service.getBooks().subscribe((res) => {
      this.books = res;
      this.filteredBooks = res;
    }
    );
  }

  onSearchQueryChange(): void {
    this.filterBooks();
  }

  filterBooks(): void {
    if (!this.searchQuery) {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book => {
        const titleMatch = book?.Title?.toLowerCase().includes(this.searchQuery.toLowerCase());
        const authorMatch = book?.AuthorName?.toLowerCase().includes(this.searchQuery.toLowerCase());
        const categoryMatch = book?.CategoryName?.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase());
        return titleMatch || authorMatch || categoryMatch;
      });
    }
  }

  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.service.deleteBook(bookId).subscribe(() => {
        alert('Book deleted successfully');
        this.filterBooks();
      }
      );
    }
  }

  openAddModal(): void {
    this.showModal = true;
    this.selectedBook = null;
    this.bookForm.reset();
  }

  openEditModal(book: any): void {
    this.showModal = true;
    this.selectedBook = book;
    this.bookForm.patchValue({
      title: book.Title,
      authorName: book.AuthorName,
      categoryName: book.CategoryName,
      year: book.PublishedYear,
      language: book.Language,
      totalCopies: book.TotalCopies,
      image: book.Image
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedBook = null;
    this.bookForm.reset();
  }
  onSubmit(): void {
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      if (this.selectedBook) {
        this.service.updateBook(formData, this.selectedBook.BookID).subscribe(() => {
          alert('Book updated successfully');
          this.fetchBooks();
          this.closeModal();
        }
        );
      } else {
        this.service.insertBook(formData).subscribe(() => {
          alert('Book added successfully');
          this.fetchBooks();
          this.closeModal();
        }
        );
      }
    }
  }
}