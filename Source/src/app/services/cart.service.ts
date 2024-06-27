import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookResponse } from '../models';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<BookResponse[]>(this.getCartItemsFromLocalStorage());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  public addToCart(book: BookResponse) {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = [...currentCartItems, book];
    this.cartItemsSubject.next(updatedCartItems);
    this.updateLocalStorage(updatedCartItems);
  }

  public removeFromCart(book: BookResponse) {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = currentCartItems.filter(item => item.id !== book.id);
    this.cartItemsSubject.next(updatedCartItems);
    this.updateLocalStorage(updatedCartItems);
  }

  public clearCart() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('cartItems');
      this.cartItemsSubject.next([]);

    }
  }

  private updateLocalStorage(cartItems: BookResponse[]) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }

  private getCartItemsFromLocalStorage(): BookResponse[] {
    if (typeof window !== 'undefined' && window.localStorage.getItem('cartItems')) {

      const storedCartItems = window.localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
    }
    return [];
  }
}