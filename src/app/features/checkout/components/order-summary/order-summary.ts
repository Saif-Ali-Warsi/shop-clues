import { Component, inject, signal, output } from '@angular/core';
import { CheckoutService } from '../../services/checkout-service';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart-service';

@Component({
  selector: 'app-order-summary',
  imports: [],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
})
export class OrderSummary {

  private checkoutService = inject(CheckoutService);
  private cartService = inject(CartService);
  private router = inject(Router);

  cartItems = this.cartService.cartItems;

  cartTotal = this.cartService.totalPrice;

  address = this.checkoutService.address;

  paymentMethod = this.checkoutService.paymentMethod;

  isPlacingOrder = signal(false);

    back = output<void>();

  placeOrder() {
    if (!this.checkoutService.address()) {
      alert('Please fill the address');
      return;
    }

    if (!this.checkoutService.paymentMethod()) {
      alert('Please select a payment method.');
      return;
    }

    this.isPlacingOrder.set(true);

    setTimeout(() => {

      const today = new Date();

      const deliveryDate = new Date(today);

      deliveryDate.setDate(today.getDate() + 5);

      this.checkoutService.orderId.set(
        Math.floor(100000 + Math.random() * 900000)
      );

      this.checkoutService.orderDate.set(today);

      this.checkoutService.estimatedDelivery.set(deliveryDate);

      this.cartService.clearCart();

      this.isPlacingOrder.set(false);

      this.router.navigate(['/order-success']);

    }, 2000);

  }

    goBack() {
    this.back.emit();
  }

}
