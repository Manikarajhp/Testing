import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <footer class="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 pt-16 pb-8 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <!-- Logo & Description -->
          <div class="col-span-1 md:col-span-1">
            <a routerLink="/" class="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SHOP.
            </a>
            <p class="mt-4 text-gray-500 dark:text-gray-400 leading-relaxed">
              Experience the best in modern e-commerce. Quality products, fast delivery, and premium support.
            </p>
            <div class="flex space-x-4 mt-6">
              <a href="#" class="text-gray-400 hover:text-indigo-600 transition-colors"><mat-icon>facebook</mat-icon></a>
              <a href="#" class="text-gray-400 hover:text-indigo-600 transition-colors"><mat-icon>camera_alt</mat-icon></a>
              <a href="#" class="text-gray-400 hover:text-indigo-600 transition-colors"><mat-icon>alternate_email</mat-icon></a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-gray-900 dark:text-white font-bold mb-6">Quick Links</h4>
            <ul class="space-y-4">
              <li><a routerLink="/" class="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors">Home</a></li>
              <li><a routerLink="/category" class="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors">Categories</a></li>
              <li><a routerLink="/orders" class="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors">My Orders</a></li>
              <li><a routerLink="/profile" class="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors">Profile</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h4 class="text-gray-900 dark:text-white font-bold mb-6">Support</h4>
            <ul class="space-y-4">
              <li><a href="#" class="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors">Help Center</a></li>
              <li><a href="#" class="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors">Returns</a></li>
              <li><a href="#" class="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors">Shipping</a></li>
              <li><a href="#" class="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <!-- Newsletter Placeholder -->
          <div>
            <h4 class="text-gray-900 dark:text-white font-bold mb-6">Newsletter</h4>
            <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">Subscribe to get special offers and once-in-a-lifetime deals.</p>
            <div class="flex">
              <input type="email" placeholder="Your email" 
                     class="bg-gray-50 dark:bg-slate-800 border-none rounded-l-xl px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 dark:text-gray-200 transition-all">
              <button class="bg-indigo-600 text-white px-4 py-2 rounded-r-xl hover:bg-indigo-700 transition-colors">
                <mat-icon class="!text-sm">send</mat-icon>
              </button>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2024 SHOP. All rights reserved.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" class="hover:text-indigo-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FooterComponent {}
