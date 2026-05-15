import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService = inject(CartService);

  cartItems = this.cartService.cart;
  totalPrice = this.cartService.totalPrice;
  cartCount = this.cartService.cartCount;

  increaseQuantity(productId: string, currentQuantity: number) {
    this.cartService.updateQuantity(productId, currentQuantity + 1);
  }

  decreaseQuantity(productId: string, currentQuantity: number) {
    this.cartService.updateQuantity(productId, currentQuantity - 1);
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}
