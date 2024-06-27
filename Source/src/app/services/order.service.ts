import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  purchaseOrder(bookIds: string[]): Observable<any> {
    const orderRequest = { Books: bookIds };
    return this.http.post<any>(`${this.apiUrl}/api/v1/orders`, orderRequest);
  }

  getOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${environment.apiUrl}/api/v1/orders/user`);
  }

  getOrder(id: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${environment.apiUrl}/api/v1/orders/${id}`);
  }
}