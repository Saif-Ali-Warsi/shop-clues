import { Component, inject, signal, OnInit, output } from '@angular/core';
import { Category } from '../../models/category.model';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-category-filter',
  imports: [],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.scss',
})
export class CategoryFilter implements OnInit {

  private productService = inject(ProductService);

  categories = signal<Category[]>([]);

  categoryChanged = output<string>();

  ngOnInit() {
    this.loadCategories()
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (response) => {
        this.categories.set(response)
      }
    })
  }

  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.categoryChanged.emit(select.value);

  }

}
