import { Component, input, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../cart/services/cart-service';
import { AuthService } from '../../../auth/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  product = input.required<Product>();

  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);


  addToCart(event: MouseEvent) {

    event.stopPropagation();

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);

      return;
    }

    this.cartService.addToCart(this.product());
  }
}
