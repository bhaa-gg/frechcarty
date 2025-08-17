import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'Eco-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  isHidden: boolean = true;
  private readonly _formBuilder = inject(FormBuilder)
  private readonly _orderService = inject(OrderService)
  shippingAddress  !: FormGroup
  @Input() cartId!: string 
  loading: boolean = false
  constructor() {
  }
  ngOnInit(): void {  
    this.InitForm()
  }

  InitForm() {
    this.shippingAddress = this._formBuilder.group({
      details: ['Name', [Validators.required]],
      phone: ['01210031428', [Validators.required]],
      city: ['Cairo', [Validators.required]]
    })
  }
  onSubmit() {
    this.loading= true
    const shippingAddress = this.shippingAddress.value
    this._orderService.CheckoutSession(this.cartId, shippingAddress).subscribe({
      next: (res) => {
        this.loading=false
        window.open(res.session.url , '_self'); 
      },
      error: (err) => {
        console.log(err);
        this.loading=false
      },
      complete: () => {
        console.log('complete');
        this.loading=false
      }
    })
  }
}
