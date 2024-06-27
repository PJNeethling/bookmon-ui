import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { BookResponse } from '../../models';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Error } from '../../models'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: BookResponse[] = [];
  
  @Output() checkoutComplete: EventEmitter<void> = new EventEmitter<void>();


  constructor(private cartService: CartService, private orderService: OrderService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(book: BookResponse) {
    this.cartService.removeFromCart(book);
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  checkout(): void {
    const bookIds = this.cartItems.map(item => item.id);
    
    this.orderService.purchaseOrder(bookIds).subscribe({
      next: (data => {
        this.toastr.success('Order placed successfully!', 'Success');
        this.cartService.clearCart();
        this.checkoutComplete.emit();
        this.router.navigate(['/orders']);
      }),
      error: ((error: Error) => {
        this.toastr.error('Failed to place order. Please try again later.)', 'Error');
        console.error('Failed to place order', error);
      })

    });
  }

}