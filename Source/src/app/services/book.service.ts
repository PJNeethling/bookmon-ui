import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { BookResponse } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getBooks(): Observable<BookResponse[]> {
    return this.httpClient.get<BookResponse[]>(`${environment.apiUrl}/api/v1/books`);
  }
  
  getBook(id: string): Observable<BookResponse> {
    return this.httpClient.get<BookResponse>(`${environment.apiUrl}/api/v1/books/${id}`);
  }

}