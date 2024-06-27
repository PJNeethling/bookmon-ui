import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { OrderResponse } from '../../../models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  orderId!: string;
  order!: OrderResponse; 
  books: any[] = [];
  
  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.getOrder();
    });
  }

  getOrder() {
    this.orderService.getOrder(this.orderId).subscribe(
      (order) => {
        this.order = order;
      },
      (error) => {
        console.error('Error fetching order:', error);
      }
    );
  }
}
