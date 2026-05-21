import { Component, effect, ElementRef, inject, Renderer2, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { debounceTime, distinctUntilChanged, switchMap, startWith, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
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
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  
  searchControl = new FormControl('');
  theme = signal<'light' | 'dark'>(localStorage.getItem('authComponentTheme') as 'light' | 'dark' || 'light');

  private readonly THEME_STORAGE_KEY = 'authComponentTheme';

  // Effect to apply theme classes
  private themeEffect = effect(() => {
    const currentTheme = this.theme();
    localStorage.setItem(this.THEME_STORAGE_KEY, currentTheme);
    
    if (currentTheme === 'dark') {
      this.renderer.addClass(this.elementRef.nativeElement, 'dark-host');
      this.renderer.removeClass(this.elementRef.nativeElement, 'light-host');
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'light-host');
      this.renderer.removeClass(this.elementRef.nativeElement, 'dark-host');
    }
  });

  toggleTheme(): void {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }

  private readonly routeParams$ = this.route.paramMap.pipe(
    map(params => params.get('type'))
  );

  currentCategory = toSignal(this.routeParams$);

  private readonly searchQuery$ = this.searchControl.valueChanges.pipe(
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
