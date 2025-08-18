import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Orders } from '../../../shared/interfaces/order';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LoadingComponent } from "../../../shared/components/ui/loading/loading.component";

@Component({
  selector: 'Eco-orders',
  imports: [CurrencyPipe, DatePipe, LoadingComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  private readonly _orderService = inject(OrderService)
  private readonly _authService = inject(AuthService)
  allOrders !: Orders[]
  ordersId: string[] = []
  loading: boolean = false
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
    this.loading = true
    this._orderService.getAllOrders(id).subscribe({
      next: (res) => {
        console.log(res);
        this.allOrders = res
        this.loading = false
      },
      error: (err) => {
        console.log(err);
        this.loading = false
      },
      complete: () => {
        console.log('complete');
        this.loading = false
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
