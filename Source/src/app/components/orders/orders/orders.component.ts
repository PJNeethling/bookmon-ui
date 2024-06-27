import { Component, OnInit } from '@angular/core';
import { ErrorItemResponse, ErrorResponseDetails, OrderResponse, Error } from '../../../models';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orderItem: OrderResponse[] = [{
      id: "",
      books: [],
      createdDate: new Date(),
      modifiedDate: new Date()
  }];

  ordersObject: OrderResponse[] = [];

  errorItem: ErrorItemResponse[] = [{
    message: ''
  }];

  errorDetails: ErrorResponseDetails = { 
    message: '', 
    code: 0,
    errors: this.errorItem
  };

  error: Error = { 
    error: this.errorDetails
  };

  loading: boolean = false;
  orderPurchasedFailed: boolean = false;
  ordersExists: boolean = false;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      {
        next: (data => {
          this.ordersObject = data;
          this.ordersExists = true;
        }),
        error: (() => {
          console.log('failed to get the list of orders');
        })
      }

    );
  }

  getItemCount(order: OrderResponse): number {
    return order.books.length;
  }
  
}