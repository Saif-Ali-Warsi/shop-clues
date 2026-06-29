import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-service';
import { ProductCard } from '../../components/product-card/product-card';
import { Search } from '../../components/search/search';
import { CategoryFilter } from '../../components/category-filter/category-filter';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, Search, CategoryFilter],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {

  private productService = inject(ProductService);

  isLoading = false;
  products = signal<Product[]>([]);
  searchTerm = signal('');
  selectedCategory = signal('');

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    const search = this.searchTerm()
    const category = this.selectedCategory()

    if (!search && !category) {
      this.productService.getProducts().subscribe({
        next: (response) => {
          this.products.set(response.products);
        }
      })

      return;
    }

    if (search && !category) {
      this.productService.searchProducts(search).subscribe({
        next: (response) => {
          this.products.set(response.products)
        }
      })
      return;
    }

    if (!search && category) {
      this.productService.getProductsByCategory(category).subscribe({
        next: (response) => {
          this.products.set(response.products)
        }
      })
    }

    if (search && category) {
      this.productService.searchProducts(search).subscribe({
        next: (response) => {
          const filterredProduct = response.products.filter(
            product => product.category === category
          )

          this.products.set(filterredProduct)
        }
      });
      return;
    }
  }

  onSearch(query: string) {
    this.searchTerm.set(query)
    this.loadProducts();
  }

  onCategoryChange(category: string) {
    this.selectedCategory.set(category)
    this.loadProducts();
  }
}


