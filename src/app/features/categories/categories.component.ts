import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Category } from '../../core/models/category.model';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    CategoryCardComponent,

],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private productService = inject(ProductService);

  allCategories = signal<Category[]>([]);
  filteredCategories = signal<Category[]>([]);
  searchQuery = signal('');
  sortOption = signal<'name' | 'count'>('name');

  ngOnInit() {
    this.productService.getCategories().subscribe(categories => {
      this.allCategories.set(categories);
      this.applyFiltersAndSort();
    });
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.applyFiltersAndSort();
  }

  setSort(option: 'name' | 'count') {
    this.sortOption.set(option);
    this.applyFiltersAndSort();
  }

  private applyFiltersAndSort() {
    let result = this.allCategories().filter(cat => 
      cat.name.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
      cat.description.toLowerCase().includes(this.searchQuery().toLowerCase())
    );

    if (this.sortOption() === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => (b.productCount || 0) - (a.productCount || 0));
    }

    this.filteredCategories.set(result);
  }
}
