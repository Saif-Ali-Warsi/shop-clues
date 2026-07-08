import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout-service';

@Component({
  selector: 'app-address-form',
  imports: [ReactiveFormsModule],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss',
})
export class AddressForm {

  private fb = inject(FormBuilder);
  private checkoutService = inject(CheckoutService);

  continue = output<void>()

  addressForm = this.fb.group({
    fullName: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    pincode: ['', Validators.required],
  });


  submit() {
   if (this.addressForm.invalid) {
    this.addressForm.markAllAsTouched();
    return;
  }

    this.checkoutService.address.set(
      this.addressForm.getRawValue()
    )

    this.continue.emit();
  }

}
