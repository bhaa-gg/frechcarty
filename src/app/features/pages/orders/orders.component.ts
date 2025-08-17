import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Orders } from '../../../shared/interfaces/order';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'Eco-orders',
  imports: [CurrencyPipe , DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  private readonly _orderService = inject(OrderService)
  private readonly _authService = inject(AuthService)
  allOrders !: Orders[]

  ordersId: string[] = []

  ngOnInit(): void {
    this._authService.authUser.subscribe({
      next: (res: any) => {
        this.getOrders(res.id)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  getOrders(id: string) {
    this._orderService.getAllOrders(id).subscribe({
      next: (res) => {
        console.log(res);
        this.allOrders = res
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    })
  }


  HandleAccordingClick(orderId: string) {
    if (this.ordersId.includes(orderId)) {
      this.ordersId = this.ordersId.filter((id) => id !== orderId)
    } else {
      this.ordersId.push(orderId)
    }
  }

}
