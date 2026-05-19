import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService, Review } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSnackBarModule
],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly snackBar = inject(MatSnackBar);

  reviews = signal<Review[]>([]);
  quantity = signal(1);

 product = toSignal(
  this.route.paramMap.pipe(

    map(params => params.get('id')),

    switchMap(id => {

      window.scrollTo(0, 0);

      if (!id) {
        return of(undefined);
      }

      return this.productService.getProductById(id);

    }),

    tap(product => {

      if (product) {

        product.stock = 10;

        this.loadReviews(String(product.id));

      }

    })

  )
);

  loadReviews(productId: string) {
    this.productService.getProductReviews(productId).subscribe(reviews => {
      this.reviews.set(reviews);
    });
  }

  incrementQuantity() {

  const currentProduct = this.product();

  if (!currentProduct) return;

  const stock = currentProduct.stock || 10;

  if (this.quantity() < stock) {
    this.quantity.update(q => q + 1);
  }

}

  decrementQuantity() {
    this.quantity.update(q => q > 1 ? q - 1 : q);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, this.quantity());
    this.snackBar.open(`${product.title} (${this.quantity()}) added to cart! 🛒`, 'Close', {
      duration: 3000,
      panelClass: ['bg-indigo-600', 'text-white']
    });
  }
}
