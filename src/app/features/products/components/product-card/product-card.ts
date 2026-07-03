import { Component, input, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../cart/services/cart-service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  product = input.required<Product>();

  private cartService = inject(CartService)


  addToCart() {
    this.cartService.addToCart(this.product());
  }
}
