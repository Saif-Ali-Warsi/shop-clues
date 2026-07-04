import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart-service';
import { AuthService } from '../../../features/auth/services/auth-service';
import { ProductService } from '../../../features/products/services/product-service';
import { Category } from '../../../features/products/models/category.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {

  private cartService = inject(CartService);
  authService = inject(AuthService);
  private productService = inject(ProductService)

  cartCount = this.cartService.cartCount;
  categories: Category[] = [];

  ngOnInit(): void {
    this.loadCategories()
  }

  logout() {
    this.authService.logout()
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories
      }
    })
  }


}
