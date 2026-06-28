import { Component, inject, OnInit, signal, Signal } from '@angular/core';
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

  products = signal<Product[]>([]);
  isLoading = false;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products.set(response.products)
        this.isLoading = true;
      },

      error: (error) => {

      }
    });
  }

  onSearch(products: Product[]) {
    this.products.set(products)
  }

  onCategoryChange(products: Product[]) {
    this.products.set(products)
  }
}


