import { Component, effect, ElementRef, inject, Renderer2, signal } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { LucideIconData, Home, LucideAngularModule, LayoutGrid, Package, UserRound, ShoppingCart  } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatButtonModule, MatToolbarModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);
  homeIcon = Home;
  catIcon = LayoutGrid;
  orderIcon = Package;
  userIcon = UserRound;
  cartIcon = ShoppingCart;

  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  isMenuOpen = signal(false);
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
  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }
}
