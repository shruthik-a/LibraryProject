import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private service: CategoryService) { }

  categories: any[] = [];

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.service.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  deleteCategory(categoryId: string): void {
  }

  addCategory(): void {
  }

  editCategory(userId: string): void {
  }

}