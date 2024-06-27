import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/account/login/login.component';
import { FormsModule } from '@angular/forms';
import { BooksComponent } from './components/books/books/books.component';
import { BookComponent } from './components/books/book/book.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { CartComponent } from './components/cart/cart.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersComponent } from './components/orders/orders/orders.component';
import { OrderComponent } from './components/orders/order/order.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BooksComponent,
    BookComponent,
    CartComponent,
    OrdersComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    AuthInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
