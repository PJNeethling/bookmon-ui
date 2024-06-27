import { Component, OnInit, TemplateRef } from '@angular/core';
import { BookResponse, ErrorItemResponse, ErrorResponseDetails, Error } from '../../../models';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  modalRef!: BsModalRef;
  selectedBook: any;
  
  books: BookResponse[] = [];

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
  bookPurchasedFailed: boolean = false;
  booksExists: boolean = false;

  constructor(private bookService: BookService, private router: Router, private cartService: CartService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      {
        next: (data => {
          this.books = data;
          this.booksExists = true;
        }),
        error: (() => {
          console.log('failed to get the list of books');
        })
      }

    );
  }

  addToCart(book: BookResponse): void {
    this.cartService.addToCart(book);
  }

  openModal(template: TemplateRef<any>, book: any) {
    this.selectedBook = book;
    this.modalRef = this.modalService.show(template);
  }
}