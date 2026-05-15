import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule, 
    NavbarComponent,
    FooterComponent,
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);
  
  searchControl = new FormControl('');

  private routeParams$ = this.route.paramMap.pipe(
    map(params => params.get('type'))
  );

  currentCategory = toSignal(this.routeParams$);

  private searchQuery$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged()
  );
  
  products = toSignal(
    combineLatest([this.routeParams$, this.searchQuery$]).pipe(
      switchMap(([category, query]) => {
        if (category) {
          // If category is provided in route, filter by category AND query
          return this.productService.searchProducts(query || '').pipe(
            map(products => products.filter(p => 
              p.category.toLowerCase() === category.toLowerCase()
            ))
          );
        }
        return this.productService.searchProducts(query || '');
      })
    ),
    { initialValue: [] }
  );

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.snackBar.open(`${product.title} added to cart! 🛒`, 'Close', {
      duration: 3000,
      panelClass: ['bg-indigo-600', 'text-white']
    });
  }
}
