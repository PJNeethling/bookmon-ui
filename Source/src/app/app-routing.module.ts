import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { BooksComponent } from './components/books/books/books.component';
import { authGuard } from './helpers/auth.guard';
import { OrdersComponent } from './components/orders/orders/orders.component';
import { OrderComponent } from './components/orders/order/order.component';

const routes: Routes = [
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'orders/:id', component: OrderComponent, canActivate: [authGuard]},
  { path: 'books', component: BooksComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
