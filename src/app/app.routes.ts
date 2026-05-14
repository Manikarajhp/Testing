import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'category', component: HomeComponent }, // Placeholder
  { path: 'orders', component: HomeComponent }, // Placeholder
  { path: 'cart', component: HomeComponent }, // Placeholder
  { path: 'profile', component: ProfileComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
