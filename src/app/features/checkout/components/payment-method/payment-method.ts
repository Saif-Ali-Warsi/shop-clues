import { Component, inject, output } from '@angular/core';
import { CheckoutService } from '../../services/checkout-service';
import { TotalQuotation } from '../total-quotation/total-quotation';

@Component({
  selector: 'app-payment-method',
  imports: [TotalQuotation],
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.scss',
})
export class PaymentMethod {

  private checkoutService = inject(CheckoutService);

  continue = output<void>();

  back = output<void>();

  onPaymentChange(event: Event) {

    const radio = event.target as HTMLInputElement;

    this.checkoutService.paymentMethod.set(radio.value);

  }

  continueToSummary() {

    if (!this.checkoutService.paymentMethod()) {
      alert('Please select a payment method.');
      return;
    }

    this.continue.emit();

  }

  goBack() {
    this.back.emit();
  }

}
