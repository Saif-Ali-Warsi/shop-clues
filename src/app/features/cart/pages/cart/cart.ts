import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  private cartService = inject(CartService)
  private router = inject(Router);

  cartItem = this.cartService.cartItems;

  cartCount = this.cartService.cartCount;
  cartTotal = this.cartService.totalPrice;

  increaseQuantity(id: number) {
    this.cartService.increaseQuantity(id);
  }

  decreaseQuantity(id: number) {
    this.cartService.decreaseQuantity(id)
  }

  removeItem(id: number) {
    this.cartService.removeItem(id)
  }

  proceedCheckout() {
    this.router.navigate(['/checkout'])
  }

}
