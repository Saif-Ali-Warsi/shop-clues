import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-service';
import { ProductCard } from '../../components/product-card/product-card';
import { ActivatedRoute } from '@angular/router';
import { FilterSidebar } from '../../components/filter-sidebar/filter-sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, FilterSidebar],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isLoading = false;
  products = signal<Product[]>([]);
  searchTerm = signal('');
  selectedCategories = signal<string[]>([]);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      const categories = params['categories'] ?? '';
      const search = params['search'] ?? '';

      this.selectedCategories.set(
        categories ? categories.split(',') : []
      );
      this.searchTerm.set(search);

      this.loadProducts();
    })
  }

  loadProducts() {

    this.isLoading = true;

    this.productService.getProducts().subscribe({
      next: (response) => {
        let products = response.products;

        const search = this.searchTerm();

        if (search) {
          products = products.filter(product =>
            product.title.toLowerCase().includes(search.toLowerCase())
          )
        }


        const categories = this.selectedCategories();

        if (categories.length) {

          console.log(products[0].category)

          products = products.filter(product => {
          return  categories.includes(product.category)
          })
        }

        this.products.set(products);
      }
    });

  }

  onSearch(query: string) {
    this.searchTerm.set(query)
    this.loadProducts();
  }



  onCategoriesChanged(categories: string[]) {
    this.router.navigate(['/products'], {
      queryParams: {
        categories: categories.length ? categories.join(',') : null
      }, queryParamsHandling: 'merge'
    })
  }
}


