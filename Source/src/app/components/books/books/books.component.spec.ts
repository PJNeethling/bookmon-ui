import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BooksComponent],
      providers: [BookService, Router, CartService, BsModalService]

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
