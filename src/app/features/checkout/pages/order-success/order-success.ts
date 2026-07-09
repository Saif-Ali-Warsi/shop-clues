import { Component, inject, OnInit, signal } from '@angular/core';
import { CheckoutService } from '../../services/checkout-service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-order-success',
  imports: [DatePipe],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss',
})
export class OrderSuccess implements OnInit {

  private checkoutService = inject(CheckoutService);

  private router = inject(Router);

  orderId = this.checkoutService.orderId;

  orderDate = this.checkoutService.orderDate;

  estimatedDelivery = this.checkoutService.estimatedDelivery;

  countdown = signal(5);

  private intervalId?: ReturnType<typeof setInterval>;

  startCountdown() {

    this.intervalId = setInterval(() => {

      this.countdown.update(value => value - 1);

      if (this.countdown() === 0) {

        clearInterval(this.intervalId);

        this.continueShopping();

      }

    }, 1000);

  }

  ngOnInit(): void {

    this.startCountdown();

    if (!this.orderId()) {
      this.router.navigate(['/'])
    }
  }

  continueShopping() {

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.checkoutService.orderId.set(null);
    this.checkoutService.orderDate.set(null);
    this.checkoutService.estimatedDelivery.set(null);

    this.router.navigate(['/']);

  }

}
