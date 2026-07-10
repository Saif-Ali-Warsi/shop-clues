import { Component, inject } from '@angular/core';
import { CartService } from '../../../cart/services/cart-service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-total-quotation',
  imports: [DecimalPipe],
  templateUrl: './total-quotation.html',
  styleUrl: './total-quotation.scss',
})
export class TotalQuotation {

    private cartService = inject(CartService)

  cartItem = this.cartService.cartItems;

  cartCount = this.cartService.cartCount;
  cartTotal = this.cartService.totalPrice;

}
