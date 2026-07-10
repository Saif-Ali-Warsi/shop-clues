import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-service';
import { ProductCard } from '../../components/product-card/product-card';
import { ActivatedRoute } from '@angular/router';
import { FilterSidebar } from '../../components/filter-sidebar/filter-sidebar';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../shared/services/notification-service';

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

  private notification = inject(NotificationService);

  isLoading = false;
  products = signal<Product[]>([]);
  searchTerm = signal('');
  selectedCategories = signal<string[]>([]);
  sort = signal('relevance');

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      const categories = params['categories'] ?? '';
      const search = params['search'] ?? '';
      const sort = params['sort'] ?? '';

      this.selectedCategories.set(
        categories ? categories.split(',') : []
      );
      this.searchTerm.set(search);
      this.sort.set(sort);

      this.loadProducts();
    });
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
            return categories.includes(product.category)
          })
        }

        const sort = this.sort();

        switch (sort) {

          case 'priceAsc':

            products = [...products].sort(
              (a, b) => a.price - b.price
            );

            break;

          case 'priceDesc':

            products = [...products].sort(
              (a, b) => b.price - a.price
            );

            break;

          case 'rating':

            products = [...products].sort(
              (a, b) => b.rating - a.rating
            );

            break;

        }



        this.products.set(products);
      },

      error: () => {
        this.notification.error('Unable to load products.');
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

  onSortChanged(sort: string) {

    this.router.navigate(
      ['/products'],
      {
        queryParams: {
          sort: sort === 'relevance' ? null : sort
        },
        queryParamsHandling: 'merge'

      }
    )


  }
}


