import { Component, inject, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss',
})
export class OrderSuccess implements OnInit {

  private checkoutService = inject(CheckoutService);

  private router = inject(Router);

  orderId = this.checkoutService.orderId;

  orderDate = this.checkoutService.orderDate;

  estimatedDelivery = this.checkoutService.estimatedDelivery;

  ngOnInit(): void {
    if (!this.orderId()) {
      this.router.navigate(['/'])
    }
  }

  continueShopping() {

  this.checkoutService.orderId.set(null);
  this.checkoutService.orderDate.set(null);
  this.checkoutService.estimatedDelivery.set(null);

  this.router.navigate(['/']);

}

}
