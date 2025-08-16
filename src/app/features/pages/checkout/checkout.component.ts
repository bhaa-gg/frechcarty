import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'Eco-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  isHidden: boolean = true;
  private readonly _formBuilder = inject(FormBuilder)
  shippingAddress  !: FormGroup
  constructor() {
  }
  ngOnInit(): void {
    this.InitForm()
  }

  InitForm() {
    this.shippingAddress = this._formBuilder.group({
      details: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]]
    })
  }
  onSubmit() {
    const shippingAddress = this.shippingAddress.value
    console.log(shippingAddress);
  }
}
