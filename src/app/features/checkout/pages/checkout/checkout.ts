import { Component, signal } from '@angular/core';
import { AddressForm } from '../../components/address-form/address-form';
import { PaymentMethod } from '../../components/payment-method/payment-method';
import { OrderSummary } from '../../components/order-summary/order-summary';

@Component({
  selector: 'app-checkout',
  imports: [AddressForm, PaymentMethod, OrderSummary],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {

  currentStep = signal<'address' | 'payment' | 'summary'>('address');

  goToPayment() {
    this.currentStep.set('payment')
  }

  goToSummary(){
    this.currentStep.set('summary')
  }

}
