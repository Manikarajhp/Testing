import { effect, Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    {
      id: '1',
      username: 'john_doe',
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
      phoneNumber: '9876543210',
      address: '123 E-commerce St',
      city: 'ShopCity',
      state: 'TechState',
      country: 'Webland',
      gender: 'male',
      pincode: '123456',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      role: 'user',
      cart: [],
      wishlist: [],
      orderCount: 5,
      createdAt: new Date()
    }
  ];

  private readonly currentUserSignal = signal<User | null>(null); // initialize the current user value to null
  public currentUser = this.currentUserSignal.asReadonly(); // this currentUser used only in this file

  
  
  register(userData: Partial<User>): Observable<User> {
    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      return throwError(() => new Error('Email already exists'));
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      username: userData.username || '',
      email: userData.email || '',
      password: userData.password || '',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username || 'User'}`,
      role: 'user',
      cart: [],
      wishlist: [],
      orderCount: 0,
      createdAt: new Date(),
      ...userData
    };

    this.users.push(newUser);
    return of(newUser).pipe(delay(1000));
  }

  login(email: string, password: string): Observable<User> {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      const emailExists = this.users.some(u => u.email === email);
      if (emailExists) {
        return throwError(() => new Error('Incorrect password'));
      }
      return throwError(() => new Error('User not found'));
    }

    return of(user).pipe(
      delay(1000),
      tap(u => {
        this.currentUserSignal.set(u);// store the current user in the signal
        localStorage.setItem('currentUser', JSON.stringify(u));
      })
    );
  }

  updateProfile(profileData: Partial<User>): Observable<User> {
    const currentUser = this.currentUserSignal();
    if (!currentUser) return throwError(() => new Error('Not logged in'));

    const updatedUser = { ...currentUser, ...profileData };
    this.currentUserSignal.set(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const index = this.users.findIndex(u => u.id === currentUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }

    return of(updatedUser).pipe(delay(800));
  }

  logout() {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
  }

  isEmailAvailable(email: string): boolean {
    return !this.users.some(u => u.email === email);
  }
}
