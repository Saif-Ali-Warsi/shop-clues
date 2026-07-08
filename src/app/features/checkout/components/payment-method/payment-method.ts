import { Component, inject, output } from '@angular/core';
import { CheckoutService } from '../../services/checkout-service';
import { ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-payment-method',
  imports: [ɵInternalFormsSharedModule],
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.scss',
})
export class PaymentMethod {

  private checkoutService = inject(CheckoutService);

  continue = output<void>();

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

}
