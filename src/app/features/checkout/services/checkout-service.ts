import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {

  address = signal<any>(null);

  paymentMethod = signal('');

  orderId = signal<number | null>(null);

  orderDate = signal<Date | null>(null);

  estimatedDelivery = signal<Date | null>(null);


}
