import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

export interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsList: Product[] = [
    {
      id: '1',
      title: 'Premium Wireless Headphones',
      description: 'High-quality sound with noise cancellation technology. Perfect for audiophiles and professional use. Features long battery life and comfortable ear cushions.',
      category: 'Electronics',
      price: 299.99,
      rating: 4.8,
      stock: 5,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Smart Watch Pro',
      description: 'Track your fitness and stay connected on the go. High-resolution display and waterproof design. Includes heart rate monitor and sleep tracking.',
      category: 'Electronics',
      price: 199.99,
      rating: 4.5,
      stock: 120,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Ultra Slim Laptop',
      description: 'Powerful performance in a sleek, portable design. Features the latest processor and long-lasting battery. Ideal for students and professionals.',
      category: 'Electronics',
      price: 1299.99,
      rating: 4.9,
      stock: 25,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Professional Camera',
      description: 'Capture every moment with stunning clarity and detail. High-resolution sensor and interchangeable lenses. Perfect for photography enthusiasts.',
      category: 'Electronics',
      price: 899.99,
      rating: 4.7,
      stock: 15,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '5',
      title: 'Ergonomic Gaming Mouse',
      description: 'Precision and comfort for long gaming sessions. Customizable buttons and RGB lighting. Ergonomic design to reduce hand strain.',
      category: 'Accessories',
      price: 59.99,
      rating: 4.6,
      stock: 200,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '6',
      title: 'Mechanical Keyboard',
      description: 'Tactile feedback and customizable lighting. Durable build and responsive keys. Enhances typing and gaming experience.',
      category: 'Accessories',
      price: 129.99,
      rating: 4.8,
      stock: 80,
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    }
  ];

  private mockReviews: Review[] = [
    {
      id: 'r1',
      reviewerName: 'Alice Johnson',
      reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      rating: 5,
      comment: 'Absolutely amazing! Exceeded my expectations in every way.',
      date: new Date('2024-03-10')
    },
    {
      id: 'r2',
      reviewerName: 'Bob Smith',
      reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      rating: 4,
      comment: 'Very good quality, but the delivery took a bit longer than expected.',
      date: new Date('2024-02-15')
    },
    {
      id: 'r3',
      reviewerName: 'Charlie Davis',
      reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      rating: 5,
      comment: 'The best purchase I have made this year. Highly recommended!',
      date: new Date('2024-01-20')
    }
  ];

  private productsSignal = signal<Product[]>(this.productsList);
  public products = this.productsSignal.asReadonly();

  getProducts(): Observable<Product[]> {
    return of(this.productsSignal()).pipe(delay(100));
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.productsSignal().find(p => String(p.id) === String(id));
    return of(product).pipe(delay(50));
  }

  searchProducts(query: string): Observable<Product[]> {
    const filtered = this.productsSignal().filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(50));
  }

  getProductReviews(productId: string): Observable<Review[]> {
    return of(this.mockReviews).pipe(delay(50));
  }
}
