import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrdersComponent } from './features/orders/orders.component';
import { CategoriesComponent } from './features/categories/categories.component';
export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'category/:type', component: HomeComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
