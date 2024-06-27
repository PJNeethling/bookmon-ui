import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TokenService, BookService],
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
