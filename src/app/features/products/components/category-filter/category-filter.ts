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

  selectedCategory = output<Product[]>();

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
    const category = select.value;

    if (!category) {
      this.productService.getProducts().subscribe((response) => {
        this.selectedCategory.emit(response.products)
      })
      return;
    }

    this.productService.getProductsByCategory(category).subscribe((response) => {
      this.selectedCategory.emit(response.products)
    })
  }

}
