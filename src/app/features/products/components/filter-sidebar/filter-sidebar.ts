import { Component, OnInit, inject, output, input } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-filter-sidebar',
  imports: [],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.scss',
})
export class FilterSidebar implements OnInit {

  private productService = inject(ProductService);

  categories: Category[] = [];

  selectedCategories: string[] = [];

  checkedCategories = input<string[]>([]);

  categoriesChanged = output<string[]>();

  sortChanged = output<string>();


  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories
      }
    })
  }

  onCategoryChange(event: Event, slug: string) {

    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.selectedCategories.push(slug)
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        category => category !== slug
      )
    }

    this.categoriesChanged.emit(this.selectedCategories)

  }

  onSortChange(event: Event) {
    const radio = event.target as HTMLInputElement;

    this.sortChanged.emit(radio.value)
  }

}
