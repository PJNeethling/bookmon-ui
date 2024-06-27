import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Euromon Books';
  isLoggedIn = false;
  cartItemCount = 0;
  showCart = false;

  constructor(private tokenService: TokenService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.isLoggedIn = this.tokenService.isLoggedIn();
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  logout(): void {
    this.tokenService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['login']);
    return;
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  hideCart(): void {
    this.showCart = false;
  }
}