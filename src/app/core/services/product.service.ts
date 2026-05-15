import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

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
  private categories: Category[] = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Latest gadgets, smart devices, and high-tech equipment.',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=60',
      icon: 'devices'
    },
    {
      id: 'fashion',
      name: 'Fashion',
      description: 'Trendsetting clothing and apparel for every style.',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=60',
      icon: 'checkroom'
    },
    {
      id: 'shoes',
      name: 'Shoes',
      description: 'Premium footwear for sports, casual, and formal wear.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60',
      icon: 'shopping_bag'
    },
    {
      id: 'mobiles',
      name: 'Mobiles',
      description: 'Smartphones and accessories with cutting-edge features.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60',
      icon: 'smartphone'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      description: 'Immersive gaming consoles, PCs, and gaming gear.',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=60',
      icon: 'sports_esports'
    },
    {
      id: 'watches',
      name: 'Watches',
      description: 'Elegant timepieces and smartwatches for every occasion.',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop&q=60',
      icon: 'watch'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Complete your look with our curated accessories.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60',
      icon: 'category'
    },
    {
      id: 'fitness',
      name: 'Fitness',
      description: 'Gear up for your fitness journey with premium equipment.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60',
      icon: 'fitness_center'
    },
    {
      id: 'furniture',
      name: 'Furniture',
      description: 'Modern and ergonomic furniture for your home and office.',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&auto=format&fit=crop&q=60',
      icon: 'chair'
    },
    {
      id: 'camera',
      name: 'Camera',
      description: 'Capture every moment with professional cameras and lenses.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
      icon: 'photo_camera'
    }
  ];

  getCategories(): Observable<Category[]> {
    const categoriesWithCount = this.categories.map(cat => ({
      ...cat,
      productCount: this.productsList.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length
    }));
    return of(categoriesWithCount);
  }

  private productsList: Product[] = [
    {
      id: '1',
      title: 'Premium Wireless Headphones',
      description: 'High-quality sound with noise cancellation technology. Perfect for audiophiles and professional use. Features long battery life and comfortable ear cushions.',
      category: 'Electronics',
      price: 299.99,
      rating: 4.8,
      stock: 50,
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
    },
    {
      id: '7',
      title: 'Nike Air Max Shoes',
      description: 'Comfortable and stylish running shoes with premium cushioning and modern sporty design.',
      category: 'Shoes',
      price: 149.99,
      rating: 4.7,
      stock: 60,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '8',
      title: 'Apple iPhone 15 Pro',
      description: 'Latest iPhone with advanced camera system, powerful A17 chip, and premium titanium design.',
      category: 'Mobiles',
      price: 1399.99,
      rating: 4.9,
      stock: 40,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '9',
      title: 'Luxury Leather Jacket',
      description: 'Premium quality leather jacket with modern fit and stylish design for all seasons.',
      category: 'Fashion',
      price: 249.99,
      rating: 4.6,
      stock: 35,
      image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '10',
      title: 'PlayStation 5 Console',
      description: 'Next generation gaming console with ultra-fast SSD and immersive gaming experience.',
      category: 'Gaming',
      price: 699.99,
      rating: 4.9,
      stock: 20,
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '11',
      title: 'Samsung 4K Smart TV',
      description: 'Ultra HD Smart TV with vibrant colors, streaming apps, and immersive cinematic experience.',
      category: 'Electronics',
      price: 999.99,
      rating: 4.8,
      stock: 18,
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '12',
      title: 'Canon DSLR Camera',
      description: 'Professional DSLR camera with high-resolution image quality and advanced photography features.',
      category: 'Camera',
      price: 1199.99,
      rating: 4.7,
      stock: 14,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '13',
      title: 'Modern Office Chair',
      description: 'Ergonomic office chair with adjustable height and lumbar support for maximum comfort.',
      category: 'Furniture',
      price: 189.99,
      rating: 4.5,
      stock: 45,
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '14',
      title: 'Fitness Dumbbell Set',
      description: 'Adjustable dumbbell set perfect for strength training and home workouts.',
      category: 'Fitness',
      price: 149.99,
      rating: 4.6,
      stock: 55,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60',
      createdAt: new Date()
    },
    {
      id: '15',
      title: 'Luxury Analog Watch',
      description: 'Elegant premium analog watch with stainless steel finish and water-resistant design.',
      category: 'Watches',
      price: 349.99,
      rating: 4.8,
      stock: 30,
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop&q=60',
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
