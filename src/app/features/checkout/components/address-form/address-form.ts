import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout-service';
import { TotalQuotation } from '../total-quotation/total-quotation';
import { NotificationService } from '../../../../shared/services/notification-service';

@Component({
  selector: 'app-address-form',
  imports: [ReactiveFormsModule, TotalQuotation],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss',
})
export class AddressForm {

  private fb = inject(FormBuilder);
  private checkoutService = inject(CheckoutService);

  private notification = inject(NotificationService);

  continue = output<void>();

  addressForm = this.fb.group({
    fullName: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    pincode: ['', Validators.required],
  });

  get fullName() {
    return this.addressForm.get('fullName');
  }

  get phone() {
    return this.addressForm.get('phone');
  }

  get address() {
    return this.addressForm.get('address');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get state() {
    return this.addressForm.get('state');
  }

  get pincode() {
    return this.addressForm.get('pincode');
  }


  submit() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    this.checkoutService.address.set(
      this.addressForm.getRawValue()
    )

    this.continue.emit();

    this.notification.success('Address saved')
  }

}
