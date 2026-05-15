import { Injectable, signal, computed } from '@angular/core';
import { Order } from '../models/order.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSignal = signal<Order[]>(this.loadOrders());

  public orders = this.ordersSignal.asReadonly();

  constructor(private cartService: CartService) {}

  private loadOrders(): Order[] {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  }

  private saveOrders(orders: Order[]) {
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  placeOrder(order: Order) {
    this.ordersSignal.update(orders => {
      const updatedOrders = [order, ...orders];
      this.saveOrders(updatedOrders);
      return updatedOrders;
    });
    this.cartService.clearCart();
  }

  getOrders() {
    return this.orders();
  }
}
