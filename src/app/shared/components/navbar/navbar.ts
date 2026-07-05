import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart-service';
import { AuthService } from '../../../features/auth/services/auth-service';
import { ProductService } from '../../../features/products/services/product-service';
import { Category } from '../../../features/products/models/category.model';
import { Search } from '../../../features/products/components/search/search';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Search],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {

  private cartService = inject(CartService);
  authService = inject(AuthService);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  cartCount = this.cartService.cartCount;
  categories: Category[] = [];

  search = '';

  ngOnInit(): void {
    this.loadCategories();

    this.route.queryParams.subscribe(params => {
      this.search = params['search'] ?? '';
    })
  }

  logout() {
    this.authService.logout();
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories
      }
    })
  }

  onSearch(query: string) {
    this.router.navigate(
      ['/products'],
      {
        queryParams: {
          search: query
        },
        queryParamsHandling: 'merge'
      }
    )
  }


}
