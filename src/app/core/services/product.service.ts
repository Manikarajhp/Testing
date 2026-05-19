import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

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
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {

  return this.http.get<any[]>('https://fakestoreapi.com/products').pipe(map(products => {
        const categoryMap = new Map<string, Category>();
        products.forEach(product => {
        const categoryName = product.category;
          if (!categoryMap.has(categoryName)) {
              categoryMap.set(categoryName, {
              id: categoryName.toLowerCase(),
              name: categoryName,
              description: `${categoryName} products collection`,
              image: product.image,
              icon: 'category',
              productCount: 1
              });
          } 
          else {
            const existingCategory = categoryMap.get(categoryName)!;
            existingCategory.productCount = (existingCategory.productCount || 0) + 1;
          }

        });
        return Array.from(categoryMap.values());
      })
    );

}

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

getProducts(): Observable<any[]> {
  return this.http.get<any[]>('https://fakestoreapi.com/products');
}

  getProductById(id: string): Observable<any> {
  return this.http.get<any>(`https://fakestoreapi.com/products/${id}`);
}   

  searchProducts(query: string): Observable<any[]> {

    return this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .pipe(

        map((products) => {

          if (!query) {
            return products;
          }

          return products.filter(product =>
            product.title
              .toLowerCase()
              .includes(query.toLowerCase())
          );

        })

      );

  }

  getProductReviews(productId: string): Observable<Review[]> {
    return of(this.mockReviews).pipe(delay(50));
  }
}
