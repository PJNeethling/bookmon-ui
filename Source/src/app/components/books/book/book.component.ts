import { Component, Input, OnInit } from '@angular/core';
import { BookResponse } from '../../../models';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit{
  
  @Input()
  public bookId!: string;

  book!: BookResponse;

  constructor(private bookService: BookService) { }

  public ngOnInit(): void {
    this.bookService.getBook(this.bookId).subscribe(
    {
      next: (data => {
        this.book = data;
      }),
      error: (() => {
        console.log('failed to get the list of books');
      })
    }

    );
  }
}
